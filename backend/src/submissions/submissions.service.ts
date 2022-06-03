import { Injectable, Query } from '@nestjs/common';
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
import {
  QuestionType,
  QuestionUnion,
} from './../forms/questions/question.typeDefs';
import { DeleteSubmissionOutput } from './dtos/delete-submission.dto';
import {
  OpenedQuestion,
  OpenedQuestionType,
} from './../forms/questions/schemas/opened-question.schema';
import { Section } from 'src/forms/schemas/section.schema';
import { OpenedAnswer } from './answers/schemas/opened-answer.schema';
import {
  ClosedQuestion,
  ClosedQuestionType,
} from 'src/forms/questions/schemas/closed-question.schema';
import { ClosedAnswer } from './answers/schemas/closed-answer.schema';
import { LinearQuestion } from 'src/forms/questions/schemas/linear-question.schema';
import { LinearAnswer } from './answers/schemas/linear-answer.schema';
import {
  PersonalQuestion,
  PersonalQuestionType,
} from './../forms/questions/schemas/personal-question.schema';
import { PersonalAnswer } from './answers/schemas/personal-answer.schema';

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
    { formId, sections }: CreateSubmissionInput,
  ): Promise<CreateSubmissionOutput> {
    try {
      const formExist = await this.formModel.findById(formId);
      if (!formExist) {
        return { ok: false, error: '폼을 찾을 수 없습니다.' };
      }

      let answers = [];

      const mongooseQuestionIds = sections.map(
        (section) => new mongoose.Types.ObjectId(section.sectionId),
      );

      if (new Set(mongooseQuestionIds).size !== mongooseQuestionIds.length) {
        return { ok: false, error: '섹션이 중복되었습니다.' };
      }

      const form = await this.formModel.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(formId) } },
        { $unwind: '$sections' },
        { $match: { 'sections._id': { $in: [...mongooseQuestionIds] } } },
        { $project: { sections: true } },
      ]);

      //중복은 없으니, 길이가 다르면 섹션이 없는 것
      if (form.length !== sections.length) {
        return { ok: false, error: '없는 섹션입니다.' };
      }

      for (let { sectionId, answers: answersInput } of sections) {
        const { sections: section } = form.find(
          (f) => f.sections._id.toString() === sectionId.toString(),
        );

        for (const type in answersInput) {
          // const type of Object.values(QuestionType)
          for (const answer of answersInput[<QuestionType>type]) {
            if (answer.kind !== type) {
              return {
                ok: false,
                error: '답변의 실제 종류와 입력한 종류가 다릅니다.(쿼리 오류)',
              };
            }

            let question = section.questions.find(
              (question) =>
                question._id.toString() === answer.question.toString(),
            );

            console.log(question);

            if (!question) {
              return { ok: false, error: '없는 질문에 대한 답변입니다.' };
            }

            if (question.kind !== answer.kind) {
              return { ok: false, error: '문제와 답변의 타입이 다릅니다.' };
            }

            if (type === QuestionType.Closed) {
              if (
                (<ClosedQuestion>question).closedType === ClosedQuestionType.One
              ) {
                if ((<ClosedAnswer>answer).closedAnswer.length === 0) {
                  return { ok: false, error: '답변이 없습니다.' };
                }

                if ((<ClosedAnswer>answer).closedAnswer.length > 1) {
                  return {
                    ok: false,
                    error:
                      '객관식의 단일 답변타입에 여러개의 답변이 들어왔습니다',
                  };
                }

                const choices = question.choices.map((choice) => choice.no);

                if (
                  !(<ClosedAnswer>answer).closedAnswer.every((v) =>
                    choices.includes(v),
                  )
                ) {
                  return { ok: false, error: '없는 선지입니다' };
                }

                //question의 선택지에 있는지 체크
              }
            } else if (type === QuestionType.Opened) {
              if (
                (<OpenedQuestion>question).openedType ===
                OpenedQuestionType.Number
              ) {
                const { openedAnswer } = <OpenedAnswer>answer;
                if (isNaN(Number(openedAnswer))) {
                  return {
                    ok: false,
                    error: '숫자 주관식 질문에 대한 답변이 숫자가 아닙니다.',
                  };
                }
              }
            } else if (type === QuestionType.Linear) {
              const { leftRange, rightRange } = <LinearQuestion>question;
              const { linearAnswer } = <LinearAnswer>answer;
              if (leftRange > linearAnswer || linearAnswer > rightRange) {
                return {
                  ok: true,
                  error: '선형답변이 범위를 벗어났습니다.',
                };
              }
            } else if (type === QuestionType.Personal) {
              const { personalType } = <PersonalQuestion>question;
              const { personalAnswer } = <PersonalAnswer>answer;

              if (personalType === PersonalQuestionType.Email) {
                var EMAIL_REGEX =
                  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

                const validateEmail = (email) => {
                  return EMAIL_REGEX.test(email);
                };

                if (!validateEmail(personalAnswer)) {
                  return {
                    ok: false,
                    error: '올바른 이메일 형식이 아닙니다.',
                  };
                }
              }
              if (personalType === PersonalQuestionType.Phone) {
                var PHONE_REGEX = /^\d{3}-\d{3,4}-\d{4}$/;
                const validatePhone = (phone) => {
                  return PHONE_REGEX.test(phone);
                };

                if (!validatePhone(personalAnswer)) {
                  return {
                    ok: false,
                    error: '올바른 전화번호 형식이 아닙니다.',
                  };
                }
                //프론트와 구현 좀 더 공유 후 작성
              }
            }

            //complete
            answers.push(answer);
          }
        }

        const requiredQuestions = section.questions.filter(
          (question) => question.required === true,
        );

        for (let requiredQuestion of requiredQuestions) {
          const exists = answers.find(
            (answer) =>
              answer.question.toString() === requiredQuestion._id.toString(),
          );
          if (!exists) {
            return { ok: false, error: '필수 답변 질문이 없습니다.' };
          }
        }
      }

      const session = await this.connection.startSession();

      await session.withTransaction(async () => {
        const [submission] = await this.submissionModel.create(
          [
            {
              form: formExist._id,
              answers,
              respondent: respondent ? respondent : null,
            },
          ],
          { session },
        );

        await this.formModel.updateOne(
          { _id: formId },
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
      const [submission] = await this.submissionModel.aggregate([
        {
          $match: { _id: new mongoose.Types.ObjectId(id) },
        },
        {
          $lookup: {
            from: 'forms',
            localField: 'form',
            foreignField: '_id',
            as: 'form',
          },
        },
        {
          $unwind: '$form',
        },
      ]);

      //form의 어느 정보까지 줄것인지 select
      if (!submission) {
        return { ok: false, error: '제출을 찾을 수 없습니다.' };
      }

      if (
        submission.respondent?.toString() !== owner._id.toString() &&
        submission.form?.owner.toString() !== owner._id.toString()
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

  async editFavoriteSubmission() {
    try {
      // this.submissionModel.updateMany({_id:})

      return { ok: true };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }
}
