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
import { ClosedAnswer } from './../submissions/answers/schemas/closed-answer.schema';
import {
  GetMarketBasketInput,
  GetMarketBasketOutput,
} from './dtos/get-market-basket.dto';

@Injectable()
export class StatService {
  constructor(
    @InjectModel(Submission.name)
    private readonly submissionModel: Model<SubmissionDocument>,
    @InjectModel(Form.name)
    private readonly formModel: Model<FormDocument>,
  ) {}

  async findQuestion(formId: string, questionIds: string[]) {
    const mongooseQuestionIds = questionIds.map(
      (id) => new mongoose.Types.ObjectId(id),
    );

    //type 검사를 위해서 분리해서 연산
    const form = await this.formModel.aggregate([
      {
        $match: { _id: new mongoose.Types.ObjectId(formId) },
      },
      { $unwind: '$sections' },
      { $unwind: '$sections.questions' },
      {
        $match: {
          'sections.questions._id': { $in: [...mongooseQuestionIds] },
        },
      },
      {
        $project: { sections: { questions: true } },
      },
    ]);

    if (form.length === 0) {
      throw new Error('질문이 존재하지 않습니다');
    }

    //만약 질문이 여러개라면 array return?
    return form;
  }

  async getKeywordAnalysis({
    formId,
    questionId,
  }: GetKeywordAnalysisInput): Promise<GetKeywordAnalysisOutput> {
    try {
      const END_POINT = `${process.env.STAT_END_POINT}/stats/keywords`;

      const [form] = await this.findQuestion(formId, [questionId]);

      if (form.sections.questions.kind !== QuestionType.Opened) {
        return { ok: false, error: `질문의 타입이 주관식이 아닙니다.` };
      } else {
        if (form.sections.questions.openedType !== OpenedQuestionType.Default) {
          return {
            ok: false,
            error: `주관식 질문의 타입이 단답형/장답형이 아닙니다`,
          };
        }
      }

      const submissions = await this.formModel.aggregate([
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
    //type checking
    const forms = await this.findQuestion(formId, questionIds);

    for (const form of forms) {
      if (
        form.sections.questions.kind !== QuestionType.Opened &&
        form.sections.questions.kind !== QuestionType.Linear
      ) {
        throw new Error('질문의 타입이 주관식 또는 선형배율이 아닙니다.');
      } else if (
        form.sections.questions.kind === QuestionType.Opened &&
        form.sections.questions.openedType !== OpenedQuestionType.Number
      ) {
        throw new Error('주관식 질문의 타입이 숫자형이 아닙니다.');
      }
    }

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
      {
        $project: { submissions: { _id: true, answers: true }, _id: false },
      },
    ]);

    const jsonData = {};

    form.forEach((f) => {
      const {
        submissions: { answers, _id },
      } = f;

      if (jsonData[_id]) {
        const obj = jsonData[_id];

        if (answers.openedAnswer !== undefined) {
          obj[answers.question] = answers.openedAnswer.toString();
        } else if (answers.linearAnswer !== undefined) {
          obj[answers.question] = answers.linearAnswer.toString();
        }

        jsonData[_id] = obj;
      } else {
        const obj = {};

        if (answers.openedAnswer !== undefined) {
          obj[answers.question] = answers.openedAnswer.toString();
        } else if (answers.linearAnswer !== undefined) {
          obj[answers.question] = answers.linearAnswer.toString();
        }

        jsonData[_id] = obj;
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

  async getDescribe({ formId }: GetDescribeInput): Promise<GetDescribeOutput> {
    try {
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
          $group: {
            _id: '$submissions.answers.question',
            count: { $count: {} },
            result: {
              $accumulator: {
                init: function () {
                  return { count: 0, answer: {} };
                },
                accumulate: function (state, answer) {
                  if (answer.kind === 'Closed') {
                    const tempAnswer = state.answer;

                    for (const choice of answer.closedAnswer) {
                      tempAnswer[choice] = tempAnswer[choice]
                        ? tempAnswer[choice] + 1
                        : 1;
                    }

                    return { count: state.count + 1, answer: tempAnswer };
                  } else if (answer.kind === 'Grid') {
                    const tempAnswer = state.answer;

                    for (const gridAnswer of answer.gridAnswer) {
                      if (tempAnswer[gridAnswer.rowNo]) {
                        const obj = tempAnswer[gridAnswer.rowNo];
                        obj[gridAnswer.colNo] = obj[gridAnswer.colNo]
                          ? obj[gridAnswer.colNo] + 1
                          : 1;
                        tempAnswer[gridAnswer.rowNo] = obj;
                      } else {
                        const obj = {};
                        obj[gridAnswer.colNo] = 1;
                        tempAnswer[gridAnswer.rowNo] = obj;
                      }
                    }

                    return {
                      count: state.count + 1,
                      answer: tempAnswer,
                    };
                  } else if (answer.kind === 'Linear') {
                    return {
                      count: state.count + 1,
                      sum: state.sum
                        ? state.sum + answer.linearAnswer
                        : answer.linearAnswer,
                      min: state.min
                        ? Math.min(state.min, answer.linearAnswer)
                        : answer.linearAnswer,
                      max: state.max
                        ? Math.max(state.max, answer.linearAnswer)
                        : answer.linearAnswer,
                    };
                  } else if (answer.kind === 'Opened') {
                    if (Object.keys(state.answer).length === 0) {
                      return {
                        count: state.count + 1,
                        answer: [answer.openedAnswer],
                      };
                    } else {
                      return {
                        count: state.count + 1,
                        answer: [...state.answer, answer.openedAnswer],
                      };
                    }
                  }
                },
                accumulateArgs: ['$submissions.answers'],
                merge: function (state1, state2) {
                  return {
                    count: state1 + state2,
                  };
                },
                lang: 'js',
              },
            },
          },
        },
      ]);

      const result = {};

      for (const f of form) {
        result[f._id] = f.result;
      }

      return { ok: true, result };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  async getMarketBasket({
    formId,
    questionIds,
  }: GetMarketBasketInput): Promise<GetMarketBasketOutput> {
    try {
      const END_POINT = `${process.env.STAT_END_POINT}/stats/market-basket`;

      const form = await this.findQuestion(formId, questionIds);

      for (const f of form) {
        if (f.sections.questions.kind !== QuestionType.Closed) {
          return {
            ok: false,
            error: '질문의 타입이 객관식이 아닙니다.',
          };
        }
      }

      const mongooseQuestionIds = questionIds.map(
        (id) => new mongoose.Types.ObjectId(id),
      );

      const submissions = await this.formModel.aggregate([
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
            'submissions.answers.question': { $in: [...mongooseQuestionIds] },
          },
        },
        {
          $group: {
            _id: '$submissions._id',
            answers: { $push: '$submissions.answers' },
          },
        },
      ]);

      const jsonData = [];

      for (const { answers } of submissions) {
        const data = [];

        for (const { closedAnswer, question } of answers) {
          for (const choice of closedAnswer) {
            data.push(`${question}-${choice}`);
          }
        }
        jsonData.push(data);
      }

      const response = await fetch(END_POINT, {
        method: 'POST',
        body: JSON.stringify({ answers: [...jsonData] }),
        headers: { 'Content-Type': 'application/json' },
      });

      let { result } = await response.json();

      return { ok: true, result };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }
}
