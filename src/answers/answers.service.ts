import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ClosedAnswer,
  ClosedAnswerDocument,
} from './schemas/closed-answer.schema';
import { Model } from 'mongoose';
import {
  CreateClosedAnswerInput,
  CreateClosedAnswerOutput,
} from './dtos/create-closed-answer.dto';
import {
  Submission,
  SubmissionDocument,
} from '../submissions/schemas/submission.schema';
import {
  ClosedQuestion,
  ClosedQuestionDocument,
} from '../questions/schemas/closed-question.schema';
import {
  CreateLinearAnswerInput,
  CreateLinearAnswerOutput,
} from './dtos/create-linear-answer.dto';
import {
  LinearAnswer,
  LinearAnswerDocument,
} from './schemas/linear-answer.schema';
import {
  LinearQuestion,
  LinearQuestionDocument,
} from '../questions/schemas/linear-question.schema';

@Injectable()
export class AnswersService {
  constructor(
    @InjectModel(ClosedAnswer.name)
    private readonly closedAnswerModel: Model<ClosedAnswerDocument>,
    @InjectModel(Submission.name)
    private readonly submissionModel: Model<SubmissionDocument>,
    @InjectModel(ClosedQuestion.name)
    private readonly closedQuestionModel: Model<ClosedQuestionDocument>,
    @InjectModel(LinearAnswer.name)
    private readonly linearAnswerModel: Model<LinearAnswerDocument>,
    @InjectModel(LinearQuestion.name)
    private readonly linearQuestionModel: Model<LinearQuestionDocument>,
  ) {}

  async createClosedAnswer({
    no,
    submissionId,
    questionId,
  }: CreateClosedAnswerInput): Promise<CreateClosedAnswerOutput> {
    try {
      const submission = await this.submissionModel.findOne({
        _id: submissionId,
      });

      //create submission과 create closed question이 한번에 실행이 되어야 해서 이 상황까지 안 올듯
      if (!submission) {
        return { ok: false, error: '다시 시도해 주십시오' };
      }

      const closedQuestion = await this.closedQuestionModel.findOne({
        _id: questionId,
      });

      if (!closedQuestion) {
        return { ok: false, error: '없는 질문입니다.' };
      }

      const closedAnswer = await this.closedAnswerModel.create({
        no,
        submission,
        closedQuestion,
      });

      //add answer to submission

      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async createLinearAnswer({
    no,
    submissionId,
    questionId,
  }: CreateLinearAnswerInput): Promise<CreateLinearAnswerOutput> {
    try {
      const submission = await this.submissionModel.findOne({
        _id: submissionId,
      });

      if (!submission) {
        return { ok: false, error: '다시 시도해 주십시오' };
      }

      const linearQuestion = await this.linearQuestionModel.findOne({
        _id: questionId,
      });
      if (!linearQuestion) {
        return { ok: false, error: '없는 질문입니다.' };
      }

      const linearAnswer = await this.linearAnswerModel.create({
        no,
        submission,
        linearQuestion,
      });

      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  }
}
