import { Injectable } from '@nestjs/common';
import * as dfd from 'danfojs-node';
import { InjectModel } from '@nestjs/mongoose';
import {
  Submission,
  SubmissionDocument,
} from '../submissions/schemas/submission.schema';
import { Model, ObjectId } from 'mongoose';
import { Form, FormDocument } from './../forms/schemas/form.schema';
import { OpenedAnswer } from 'src/submissions/answers/schemas/opened-answer.schema';
import fetch from 'node-fetch';
import { GetCorrInput, GetCorrOutput } from './dtos/get-corr.dto';
import {
  GetKeywordAnalysisInput,
  GetKeywordAnalysisOutput,
} from './dtos/get-keyword-analysis.dto';
import mongoose from 'mongoose';
import { GetDescribeInput, GetDescribeOutput } from './dtos/get-describe.dto';
import { QuestionType } from '../forms/questions/question.typeDefs';
import { OpenedQuestion } from './../forms/questions/schemas/opened-question.schema';
import { OpenedQuestionType } from '../forms/questions/schemas/opened-question.schema';

@Injectable()
export class StatService {
  constructor(
    @InjectModel(Submission.name)
    private readonly submissionModel: Model<SubmissionDocument>,
    @InjectModel(Form.name)
    private readonly formModel: Model<FormDocument>,
  ) {}

  async getKeywordAnalysis({
    formId,
    questionId,
  }: GetKeywordAnalysisInput): Promise<GetKeywordAnalysisOutput> {
    try {
      const END_POINT = `${process.env.STAT_END_POINT}/stats/keywords`;

      //type 검사를 위해서 분리해서 연산
      const [form] = await this.formModel.aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(formId) },
        },
        { $unwind: '$sections' },
        { $unwind: '$sections.questions' },
        {
          $match: {
            'sections.questions._id': new mongoose.Types.ObjectId(questionId),
          },
        },
      ]);

      if (!form) {
        return { ok: false, error: '질문이 존재하지 않습니다.' };
      } else {
        if (form.sections.questions.kind !== QuestionType.Opened) {
          return { ok: false, error: '질문의 타입이 주관식이 아닙니다.' };
        } else {
          if (
            (<OpenedQuestion>form.sections.questions).openedType !==
            OpenedQuestionType.Default
          ) {
            return { ok: false, error: '질문의 타입이 단답/장문형이 아닙니다' };
          }
        }
      }

      const submissions = await this.formModel.aggregate([
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
            'submissions.answers.question': new mongoose.Types.ObjectId(
              questionId,
            ),
          },
        },
        {
          $project: { submissions: { answers: { openedAnswer: true } } },
        },
      ]);

      const answers: [string?] = [];
      for (const submission of submissions) {
        answers.push(submission.submissions.answers.openedAnswer);
      }

      if (answers.length === 0) {
        return { ok: false, error: '답변이 존재하지 않습니다.' };
      }

      //tokenization
      const response = await fetch(END_POINT, {
        method: 'POST',
        body: JSON.stringify({ answers: [...answers] }),
        headers: { 'Content-Type': 'application/json' },
      });

      let { result } = await response.json();

      // need to store in DB
      //need to make stats entity
      //need to analyze positive/negative word
      //need to analyze verb, adjective

      console.log(result);

      return { ok: true, result };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  async createJsonData(formId: string, questionIds: string[]): Promise<Object> {
    const mongooseQuestionIds = questionIds.map(
      (id) => new mongoose.Types.ObjectId(id),
    );

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
          'submissions.answers.question': {
            $in: [...mongooseQuestionIds],
          },
        },
      },
    ]);

    const jsonData = {};

    form.forEach((f) => {
      // if (type === QuestionType.Opened) {
      // } else if (type === QuestionType.Closed) {
      // } else if (type === QuestionType.Linear) {
      // }

      if (jsonData[f.submissions._id]) {
        const obj = jsonData[f.submissions._id];
        obj[f.submissions.answers.question] =
          f.submissions.answers.openedAnswer;
        jsonData[f.submissions._id] = obj;
      } else {
        const obj = {};
        obj[f.submissions.answers.question] =
          f.submissions.answers.openedAnswer;
        jsonData[f.submissions._id] = obj;
      }
    });

    return jsonData;
  }

  async getCorr({ formId, questionIds }: GetCorrInput): Promise<GetCorrOutput> {
    try {
      const END_POINT = `${process.env.STAT_END_POINT}/stats/corr`;

      const jsonData = await this.createJsonData(formId, questionIds);

      const response = await fetch(END_POINT, {
        method: 'POST',
        body: JSON.stringify({ answers: jsonData }),
        headers: { 'Content-Type': 'application/json' },
      });

      let { result } = await response.json();

      return { ok: true, result };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  async getDescribe({
    formId,
    questionIds,
  }: GetDescribeInput): Promise<GetDescribeOutput> {
    try {
      const END_POINT = `${process.env.STAT_END_POINT}/stats/describe`;

      const jsonData = await this.createJsonData(formId, questionIds);

      const response = await fetch(END_POINT, {
        method: 'POST',
        body: JSON.stringify({ answers: jsonData }),
        headers: { 'Content-Type': 'application/json' },
      });

      let { result } = await response.json();

      return { ok: true, result };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }
}
