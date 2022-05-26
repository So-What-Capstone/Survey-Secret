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
      // testing Ids
      // const formId = '62873f1dc03ea057158e8efa';
      // const questionId = '62873f1dc03ea057158e8efc';

      const { submissions } = await this.formModel
        .findOne({
          _id: formId,
        })
        .populate('submissions');

      const answers: [string?] = [];
      for (const submission of submissions) {
        let answer: OpenedAnswer = submission.answers.find(
          (answer) => answer.question.toString() === questionId,
        );

        if (answer.kind !== 'Opened') {
          return { ok: false, error: '답변의 타입이 주관식이 아닙니다.' };
        }

        answers.push(answer.openedAnswer);
      }

      if (answers.length === 0) {
        return { ok: false, error: '답변이 존재하지 않습니다.' };
      }

      //tokenization
      const response = await fetch('http://localhost:4000/stats/keywords', {
        method: 'POST',
        body: JSON.stringify({ answers: [...answers] }),
        headers: { 'Content-Type': 'application/json' },
      });

      let { result } = await response.json();

      console.log(result);

      //need to store in DB
      //need to make stats entity
      //need to analyze positive/negative word
      //need to analyze verb, adjective

      return { ok: true, result };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  async getCorr({ formId, questionIds }: GetCorrInput): Promise<GetCorrOutput> {
    try {
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
        if (jsonData[f.submissions._id]) {
          const obj = jsonData[f.submissions._id];
          obj[f.submissions.answers.question] = f.submissions.answers.content;
          jsonData[f.submissions._id] = obj;
        } else {
          const obj = {};
          obj[f.submissions.answers.question] = f.submissions.answers.content;
          jsonData[f.submissions._id] = obj;
        }
      });

      const response = await fetch('http://localhost:4000/stats/corr', {
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
