import { Inject, Injectable } from '@nestjs/common';
import * as aligoapi from 'aligoapi';
import { Request } from 'express';
import { SMS_CONFIG_OPTIONS } from 'src/common/common.constants';
import { SmsModuleOptions } from './sms.interfaces';
import { SendSmsInput } from './dtos/send-sms.dto';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import {
  GetSendHistoryInput,
  GetSendHistoryOutput,
} from './dtos/get-send-history.dto';
import {
  Contact,
  ContactDocument,
  ContactType,
} from './schemas/contact.schema';
import { Model } from 'mongoose';
import mongoose from 'mongoose';
import { User, UserDocument } from './../users/schemas/user.schema';
import { Form, FormDocument } from './../forms/schemas/form.schema';
import {
  QuestionUnion,
  QuestionType,
} from 'src/forms/questions/question.typeDefs';
import { PersonalQuestionType } from 'src/forms/questions/schemas/personal-question.schema';
import { PersonalQuestion } from './../forms/questions/schemas/personal-question.schema';

@Injectable()
export class SmsService {
  constructor(
    @Inject(SMS_CONFIG_OPTIONS) private readonly options: SmsModuleOptions,
    @InjectModel(Contact.name)
    private readonly contactModel: Model<ContactDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectModel(Form.name)
    private readonly formModel: Model<FormDocument>,
    @InjectConnection()
    private readonly connection: mongoose.Connection,
  ) {}

  async addHistoryInDB(
    user: User,
    msg: string,
    formId: string,
    submissionIds: string[],
    contactType: ContactType,
  ) {
    const session = await this.connection.startSession();

    await session.withTransaction(async () => {
      const contact = await this.contactModel.create([
        {
          sender: user,
          content: msg,
          receivers: submissionIds,
          contactType: contactType,
          form: formId,
        },
        { session },
      ]);

      await this.userModel.updateOne(
        { _id: user._id },
        { $push: { contacts: contact } },
        { session },
      );
    });
  }

  async getReceivers(
    formId: string,
    submissionIds: string[],
    questionId: string,
    user: User,
    type: PersonalQuestionType,
  ) {
    const submissionMongoIds = submissionIds.map(
      (id) => new mongoose.Types.ObjectId(id),
    );

    const formExist = await this.formModel.findOne({ _id: formId });

    if (!formExist) {
      throw new Error('폼이 존재하지 않습니다.');
    }

    if (formExist.owner._id.toString() !== user._id.toString()) {
      throw new Error('권한이 없습니다.');
    }

    let question: typeof QuestionUnion;
    for (const section of formExist.sections) {
      question = section.questions.find(
        (question) => question._id.toString() === questionId,
      );
      if (question) {
        break;
      }
    }

    if (!question) {
      throw new Error('폼 내부에 존재하지 않는 질문입니다.');
    }

    if (question.kind !== QuestionType.Personal) {
      throw new Error('개인정보 질문이 아닙니다.');
    }

    if ((<PersonalQuestion>question).personalType !== type) {
      throw new Error(`개인정보 답변이 ${type}이 아닙니다.`);
    }

    const form = await this.formModel.aggregate([
      { $match: { _id: new mongoose.Types.ObjectId(formId) } },
      {
        $lookup: {
          from: 'submissions',
          localField: 'submissions',
          foreignField: '_id',
          as: 'submissions',
        },
      },
      { $unwind: '$submissions' },
      { $unwind: '$submissions.answers' },
      {
        $match: {
          'submissions._id': { $in: [...submissionMongoIds] },
        },
      },
      {
        $match: {
          'submissions.answers.question': new mongoose.Types.ObjectId(
            questionId,
          ),
        },
      },
      { $project: { 'submissions.answers': true } },
    ]);

    if (submissionIds.length !== form.length) {
      throw new Error(
        '답변이 폼 안에 존재하지 않거나 질문이 존재하지 않습니다.',
      );
    }

    const receivers = [];

    for (const { submissions } of form) {
      const { answers } = submissions;

      receivers.push(answers.personalAnswer);
    }

    return receivers;
  }

  async sendSms(
    user: User,
    req: Request,
    { formId, submissionIds, questionId, msg, msgType }: SendSmsInput,
  ) {
    try {
      const receivers = await this.getReceivers(
        formId,
        submissionIds,
        questionId,
        user,
        PersonalQuestionType.Phone,
      );

      let newReq: Request = req;
      newReq.body = {
        sender: process.env.SMS_SENDER,
        receiver: receivers.join(','),
        msg,
        msg_type: msgType,
      };

      const res = await aligoapi.send(newReq, this.options);

      if (res.result_code == 1) {
        this.addHistoryInDB(user, msg, formId, submissionIds, ContactType.SMS);

        return { ok: true };
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  async getSendHistory(
    user: User,
    { contactType }: GetSendHistoryInput,
  ): Promise<GetSendHistoryOutput> {
    try {
      const contacts = await this.contactModel.find({
        sender: user,
        contactType,
      });

      return { ok: true, contacts };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }
}
