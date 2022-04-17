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
import { User } from '../users/schemas/user.schema';
import { QuestionUnion } from './../forms/questions/question.typeDefs';

@Injectable()
export class SubmissionsService {
  constructor(
    @InjectModel(Submission.name)
    private readonly submissionModel: Model<SubmissionDocument>,
    @InjectModel(Form.name)
    private readonly formModel: Model<FormDocument>,
    @InjectConnection()
    private readonly connection: mongoose.Connection,
  ) {}

  async createSubmission(
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
          const questionUnion = section.questions.find((question) => {
            return question._id.toString() === answer.questionId.toString();
          });

          if (questionUnion.type !== type) {
            return { ok: false, error: '문제와 답변의 타입이 다릅니다.' };
          }

          question = questionUnion.question;
          if (question) {
            break;
          }
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
        const submission = await this.submissionModel.create({
          form,
          answers,
        });

        console.log(submission.answers[0].answer.question);

        await this.formModel.updateOne(
          { _id: createSubmissionInput.formId },
          { $push: { submissions: submission } },
        );
      });

      return { ok: true };
    } catch (error) {
      return { ok: false, error };
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

      if (
        submission.respondent?._id !== owner._id &&
        submission.form.owner._id.toString() !== owner._id.toString()
      ) {
        return { ok: false, error: '권한이 없습니다.' };
      }

      if (!submission) {
        return { ok: false, error: '제출을 찾을 수 없습니다.' };
      }

      return { ok: true, submission };
    } catch (error) {
      return { ok: false, error };
    }
  }
}
