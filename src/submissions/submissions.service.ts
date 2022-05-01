import { Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Submission, SubmissionDocument } from './schemas/submission.schema';
import { Model } from 'mongoose';
import {
  CreateSubmissionInput,
  CreateSubmissionOutput,
} from './dtos/create-submission.dto';
import { Form, FormDocument } from '../forms/schemas/form.schema';
import { FindSubmissionByIdOutput } from './dtos/find-submission-by-id.dto';
import mongoose from 'mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';
import { QuestionUnion } from './../forms/questions/question.typeDefs';
import { DeleteSubmissionOutput } from './dtos/delete-submission.dto';

@Injectable()
export class SubmissionsService {
  constructor(
    @InjectModel(Submission.name)
    private readonly submissionModel: Model<SubmissionDocument>,
    @InjectModel(Form.name)
    private readonly formModel: Model<FormDocument>,
    @InjectModel(User.name)
    private readonly userModel: Model<UserDocument>,
    @InjectConnection()
    private readonly connection: mongoose.Connection,
  ) {}

  //required question에 대해서 답했는지 체크
  //여러가지 question의 요구조건 만족하는지 체크
  //submission에도 order를 넣어야할지?
  async createSubmission(
    respondent: User,
    createSubmissionInput: CreateSubmissionInput,
  ): Promise<CreateSubmissionOutput> {
    try {
      const form = await this.formModel.findById(createSubmissionInput.formId);
      if (!form) {
        return { ok: false, error: '폼을 찾을 수 없습니다.' };
      }

      let answers = [];
      for (const {
        closed,
        opened,
        linear,
        grid,
        personal,
      } of createSubmissionInput.answers) {
        answers = [
          ...(closed ? closed : []),
          ...(opened ? opened : []),
          ...(linear ? linear : []),
          ...(grid ? grid : []),
          ...(personal ? personal : []),
        ];
      }

      for (const { answer, type } of answers) {
        let question: typeof QuestionUnion;
        for (const section of form.sections) {
          // const questionUnion = section.questions.find((question) => {
          //   return question._id.toString() === answer.questionId.toString();
          // });
          // if (questionUnion) {
          //   // if (questionUnion.type !== type) {
          //   //   return { ok: false, error: '문제와 답변의 타입이 다릅니다.' };
          //   // }
          //   question = questionUnion.question;
          //   if (question) {
          //     break;
          //   }
          // }
        }

        //for debug
        if (!question) {
          return { ok: false, error: '없는 질문에 대한 답변입니다.' };
        }

        //1.question전체를 저장할지? 2.ref로 저장할지?
        delete answer.questionId;
        answer.question = question;
      }

      const session = await this.connection.startSession();

      await session.withTransaction(async () => {
        const [submission] = await this.submissionModel.create(
          [
            {
              form: form._id,
              answers,
              respondent: respondent ? respondent : null,
            },
          ],
          { session },
        );

        await this.formModel.updateOne(
          { _id: createSubmissionInput.formId },
          { $push: { submissions: submission } },
          { session },
        );
      });
      await session.endSession();

      return { ok: true };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  async findSubmissionById(
    owner: User,
    id: string,
  ): Promise<FindSubmissionByIdOutput> {
    try {
      const submission = await this.submissionModel
        .findOne()
        .where('_id')
        .equals(id)
        .populate('form');
      //form의 어느 정보까지 줄것인지 select
      if (!submission) {
        return { ok: false, error: '제출을 찾을 수 없습니다.' };
      }

      console.log(submission);
      console.log(submission.respondent);
      console.log(owner);

      if (
        submission.respondent?._id.toString() !== owner._id.toString() &&
        submission.form.owner._id.toString() !== owner._id.toString()
      ) {
        return { ok: false, error: '권한이 없습니다.' };
      }

      return { ok: true, submission };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  //findSubmissionById를 사용했기 때문에, 설문의 주인도 지울 수 있는 상태
  //안지우게 하는게 더 신뢰성 줄 듯?
  async deleteSubmission(
    owner: User,
    id: string,
  ): Promise<DeleteSubmissionOutput> {
    try {
      const result = await this.findSubmissionById(owner, id);
      if (!result.ok) {
        return { ok: false, error: result.error };
      }

      const { submission } = result;
      const session = await this.connection.startSession();

      await session.withTransaction(async () => {
        await this.submissionModel.deleteOne(
          { _id: submission._id },
          { session },
        );

        //만약 답변자의 작성한 답변들에 대한 필드를 추가한다면 그것도 수정해야 함

        await this.formModel.updateOne(
          { _id: submission.form },
          { $pull: { submissions: submission._id } },
          { session },
        );
      });
      await session.endSession();

      return { ok: true };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }
}
