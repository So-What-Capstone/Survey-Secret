import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Form, FormDocument, FormState } from './schemas/form.schema';
import { Model } from 'mongoose';
import { CreateFormInput, CreateFormOutput } from './dtos/create-form.dto';
import { User } from '../users/schemas/user.schema';
import { UserDocument } from '../users/schemas/user.schema';
import { FindSectionByIdOutput } from './dtos/find-section-by-id.dto';
import mongoose from 'mongoose';
import { FindFormByIdOutput } from './dtos/find-form-by-id.dto';
import { DeleteFormOutput } from './dtos/delete-form.dto';
import {
  Submission,
  SubmissionDocument,
} from '../submissions/schemas/submission.schema';
import { EditFormOutput, EditFormInput } from './dtos/edit-form.dto';
import { CreateSectionInput } from './dtos/create-section.dto';
import { SearchFormsInput, SearchFormsOutput } from './dtos/search-forms.dto';
import { GetFormsInput, GetFormsOutput } from './dtos/get-forms.dto';
import { Section } from './schemas/section.schema';
import { GetTemplatesOutput } from './dtos/get-templates.dto';
import { Template, TemplateDocument } from './schemas/template.schema';
import { FindTemplateByIdOutput } from './dtos/find-template-by-id.dto';
import {
  FindQuestionByIdInput,
  FindQuestionByIdOutput,
} from './dtos/find-question-by-id.dto';
import { Cron } from '@nestjs/schedule';

@Injectable()
export class FormsService {
  constructor(
    @InjectModel(Form.name) private readonly formModel: Model<FormDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Template.name)
    private readonly templateModel: Model<TemplateDocument>,
    @InjectModel(Submission.name)
    private readonly submissionModel: Model<SubmissionDocument>,
    @InjectConnection()
    private readonly connection: mongoose.Connection,
  ) {}

  //graphqlInput(opened,closed,....) to Mongo Entity(questions : [])
  preprocessSections(sectionInput: CreateSectionInput[]) {
    let sections: Section[] = [];

    for (const {
      title,
      closed,
      opened,
      grid,
      linear,
      personal,
      order,
    } of sectionInput) {
      const questions = [
        ...(closed ? closed : []),
        ...(opened ? opened : []),
        ...(grid ? grid : []),
        ...(linear ? linear : []),
        ...(personal ? personal : []),
      ];

      // consider using DB middleware(before insert)
      questions.sort(({ order }, { order: order2 }) => {
        if (order === order2) {
          throw new Error('질문 순서가 중복되었습니다.');
        }
        return order - order2;
      });

      const section = {
        order,
        title,
        questions,
      };
      sections.push(section);
    }

    sections.sort(({ order }, { order: order2 }) => {
      if (order === order2) {
        throw new Error('섹션 순서가 중복되었습니다.');
      }
      return order - order2;
    });

    return sections;
  }

  async createForm(
    user: User,
    {
      sections: sectionsInput,
      title,
      description,
      privacyExpiredAt,
      expiredAt,
      state,
    }: CreateFormInput,
  ): Promise<CreateFormOutput> {
    try {
      const sections = this.preprocessSections(sectionsInput);

      //Transaction(multi-document)
      const session = await this.connection.startSession();

      let formId: string;
      await session.withTransaction(async () => {
        const form = await this.formModel.create(
          [
            {
              title,
              description,
              privacyExpiredAt,
              expiredAt,
              sections,
              state,
              owner: user,
            },
          ],
          { session },
        );

        formId = form[0]._id;

        //if(not ~ ) : throw Exception

        await this.userModel.updateOne(
          { _id: user._id },
          { $push: { forms: form } },
          { session },
        );
      });
      await session.endSession();

      return { ok: true, formId };
    } catch (error) {
      console.error(error);
      return { ok: false, error: error.message };
    }
  }

  async findSectionById(sectionId: string): Promise<FindSectionByIdOutput> {
    try {
      const form = await this.formModel
        .findOne()
        .where('sections._id')
        .equals(sectionId)
        .select('sections');

      if (!form) {
        return { ok: false, error: '섹션을 찾을 수 없습니다.' };
      }

      const section = form.sections[0];

      return { ok: true, section };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  async findFormById(formId: string): Promise<FindFormByIdOutput> {
    try {
      //not for see result(submissions)
      const form = await this.formModel
        .findOne({ _id: formId })
        .populate('owner');

      if (!form) {
        return { ok: false, error: '폼을 찾을 수 없습니다.' };
      }

      return { ok: true, form };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  //pagination...?
  async findFormByIdForOwner(
    formId: string,
    owner: User,
  ): Promise<FindFormByIdOutput> {
    try {
      const [form]: Form[] = await this.formModel.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(formId) } },
        {
          $lookup: {
            from: 'submissions',
            localField: 'submissions',
            foreignField: '_id',
            as: 'submissions',
          },
        },
      ]);

      if (!form) {
        return { ok: false, error: '폼을 찾을 수 없습니다.' };
      }

      if (form.owner.toString() !== owner._id.toString()) {
        return { ok: false, error: '권한이 없습니다.' };
      }

      return { ok: true, form };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  async deleteForm(owner: User, formId: string): Promise<DeleteFormOutput> {
    try {
      const session = await this.connection.startSession();

      await session.withTransaction(async () => {
        const form = await this.formModel.findOneAndDelete(
          { _id: formId },
          { session },
        );

        if (!form) {
          throw new Error('폼을 찾을 수 없습니다.');
        }

        if (form.owner._id.toString() !== owner._id.toString()) {
          throw new Error('권한이 없습니다.');
        }

        //owner의 소유 forms에서 제거

        const deleteSubmissions = await this.submissionModel.deleteMany(
          { form: formId },
          { session },
        );
        const deleteFormInUser = await this.userModel.updateOne(
          { _id: owner._id },
          { $pull: { forms: formId } },
          { session },
        );

        Promise.all([deleteSubmissions, deleteFormInUser]);
      });
      await session.endSession();

      return { ok: true };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  async editForm(
    owner: User,
    {
      formId,
      title,
      description,
      sections: sectionInput,
      privacyExpiredAt,
      expiredAt,
      state,
      isPromoted,
      representativeQuestionId,
    }: EditFormInput,
  ): Promise<EditFormOutput> {
    try {
      const sections = sectionInput
        ? this.preprocessSections(sectionInput)
        : undefined;

      //title, description, sections
      const form = await this.formModel.findOne({ _id: formId });

      if (!form) {
        return { ok: false, error: '폼을 찾을 수 없습니다.' };
      }

      if (representativeQuestionId) {
        if (
          !form.sections.find((section) =>
            section.questions.find(
              (question) =>
                question._id.toString() === representativeQuestionId,
            ),
          )
        ) {
          return { ok: false, error: '폼 안에 존재하지 않는 대표문항입니다.' };
        }
      }

      if (form.owner._id.toString() !== owner._id.toString()) {
        return { ok: false, error: '권한이 없습니다.' };
      }

      await this.formModel.updateOne(
        { _id: formId },
        {
          $set: {
            sections: sectionInput ? sections : undefined,
            title: title ? title : undefined,
            description: description ? description : undefined,
            privacyExpiredAt: privacyExpiredAt ? privacyExpiredAt : undefined,
            expiredAt: expiredAt ? expiredAt : undefined,
            state: state ? state : undefined,
            representativeQuestion: representativeQuestionId
              ? representativeQuestionId
              : undefined,
            isPromoted: isPromoted !== undefined ? isPromoted : undefined,
          },
        },
      );

      return { ok: true };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  //set pagination
  async searchForms({
    title,
    lastId,
    sortKey,
    desc,
  }: SearchFormsInput): Promise<SearchFormsOutput> {
    try {
      //for testing

      const pageSize = 20;

      const sortCondition = {};
      sortCondition[sortKey] = desc ? -1 : 1;

      const forms = await this.formModel
        .find({
          $and: [
            { title: { $regex: new RegExp(title, 'i') } },
            { state: FormState.InProgress },
            lastId ? { _id: { $gt: lastId } } : {},
          ],
        })
        //-1 is descending
        .sort(sortCondition)
        .populate('owner')
        .limit(pageSize);

      // if (forms.length === 0) {
      //   return { ok: false, error: '검색된 폼이 없습니다.' };
      // }

      return {
        ok: true,
        forms,
        lastId:
          forms.length !== 0
            ? forms[forms.length - 1]._id.toString()
            : undefined,
      };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  async getForms({ lastId }: GetFormsInput): Promise<GetFormsOutput> {
    try {
      //for testing
      const pageSize = 20;
      console.log(lastId);

      const forms = await this.formModel
        .find({
          $and: [
            lastId ? { _id: { $gt: lastId } } : {},
            { state: FormState.InProgress },
          ],
        })
        .populate('owner')
        .limit(pageSize);

      if (forms.length === 0) {
        return { ok: false, error: '검색된 폼이 없습니다.' };
      }

      return {
        ok: true,
        forms,
        lastId:
          forms.length !== 0
            ? forms[forms.length - 1]._id.toString()
            : undefined,
      };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  async getTemplates(): Promise<GetTemplatesOutput> {
    try {
      const templates = await this.templateModel.find({});

      return { ok: true, templates };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  async findTemplateById(_id: string): Promise<FindTemplateByIdOutput> {
    try {
      const template = await this.templateModel.findOne({ _id });

      if (!template) {
        return { ok: false, error: '존재하지 않는 템플릿 입니다.' };
      }

      return { ok: true, template };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  async findQuestionById({
    formId,
    questionId,
  }: FindQuestionByIdInput): Promise<FindQuestionByIdOutput> {
    try {
      const [form] = await this.formModel.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(formId) } },
        { $unwind: '$sections' },
        { $unwind: '$sections.questions' },
        {
          $match: {
            'sections.questions._id': new mongoose.Types.ObjectId(questionId),
          },
        },
        { $project: { 'sections.questions': true } },
      ]);

      if (!form) {
        return { ok: false, error: '없는 질문이거나 폼이 존재하지 않습니다.' };
      }

      console.log(form);

      return { ok: true, question: form.sections.questions };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  //per every minute
  @Cron('0 * * * * *')
  async expireForm() {
    const expiredForm = await this.formModel.updateMany(
      {
        $and: [
          { expiredAt: { $lte: Date.now() } },
          { state: FormState.InProgress },
        ],
      },
      { $set: { state: FormState.Expired } },
    );
  }

  //per every day
  // @Cron('0 0 0 * * *')
  // for testing
  @Cron('* * * * * *')
  async expirePersonalQuestion() {
    const session = await this.connection.startSession();

    // await session.withTransaction(async () => {
    //   const forms = await this.formModel.find(
    //     {
    //       $and: [
    //         { privacyExpiredAt: { $lte: Date.now() } },
    //         { isPrivacyExpired: false },
    //       ],
    //     },
    //     null,
    //     { session },
    //   );

    //   console.log(forms);

    //   if (forms.length === 0) {
    //     return;
    //   }

    //   const result = await this.submissionModel.updateMany(
    //     { form: { $in: forms } },
    //     { $pull: { 'answers.kind': 'Personal' } },
    //   );

    //   const privacyExpiredForm = await this.formModel.updateMany(
    //     {
    //       $and: [
    //         { privacyExpiredAt: { $lte: Date.now() } },
    //         { isPrivacyExpired: false },
    //       ],
    //     },
    //     { $set: { isPrivacyExpired: true } },
    //   );

    //   console.log(privacyExpiredForm);
    //   console.log(result);
    // });
    // await session.endSession();
  }
}
