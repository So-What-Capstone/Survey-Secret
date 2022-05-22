import { Injectable } from '@nestjs/common';
import * as dfd from 'danfojs-node';
import { InjectModel } from '@nestjs/mongoose';
import {
  Submission,
  SubmissionDocument,
} from '../submissions/schemas/submission.schema';
import { Model } from 'mongoose';
import { Form, FormDocument } from './../forms/schemas/form.schema';
import { OpenedAnswer } from 'src/submissions/answers/schemas/opened-answer.schema';
import fetch from 'node-fetch';
import {
  GetKeywordAnalysisInput,
  GetKeywordAnalysisOutput,
} from './dtos/get-keyword-analysis.dto';

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
        let answer = submission.answers.find(
          (answer) => answer.question.toString() === questionId,
        );
        if (answer.kind !== 'Opened') {
          return { ok: false, error: '답변의 타입이 주관식이 아닙니다.' };
        }
        answer = answer as OpenedAnswer;
        answers.push(answer.content);
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
}
