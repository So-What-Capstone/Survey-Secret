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
import {
  SetFavoriteSubmissionsInput,
  SetFavoriteSubmissionsOutput,
} from './dtos/set-favorite-submissions.dto';
import {
  AnswersInFindAnswerByQuestionId,
  FindAnswerByQuestionIdInput,
  FindAnswerByQuestionIdOutput,
} from './dtos/find-answer-by-question-id-output.dto';

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

  //required question??? ????????? ???????????? ??????
  //???????????? question??? ???????????? ??????????????? ??????
  //submission?????? order??? ????????????????
  async createSubmission(
    respondent: User,
    { formId, sections }: CreateSubmissionInput,
  ): Promise<CreateSubmissionOutput> {
    try {
      const formExist = await this.formModel.findById(formId);
      if (!formExist) {
        return { ok: false, error: '?????? ?????? ??? ????????????.' };
      }

      let answers = [];

      const mongooseQuestionIds = sections.map(
        (section) => new mongoose.Types.ObjectId(section.sectionId),
      );

      if (new Set(mongooseQuestionIds).size !== mongooseQuestionIds.length) {
        return { ok: false, error: '????????? ?????????????????????.' };
      }

      const form = await this.formModel.aggregate([
        { $match: { _id: new mongoose.Types.ObjectId(formId) } },
        { $unwind: '$sections' },
        { $match: { 'sections._id': { $in: [...mongooseQuestionIds] } } },
        { $project: { sections: true } },
      ]);

      //????????? ?????????, ????????? ????????? ????????? ?????? ???
      if (form.length !== sections.length) {
        return { ok: false, error: '?????? ???????????????.' };
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
                error: '????????? ?????? ????????? ????????? ????????? ????????????.(?????? ??????)',
              };
            }

            let question = section.questions.find(
              (question) =>
                question._id.toString() === answer.question.toString(),
            );

            console.log(question);

            if (!question) {
              return { ok: false, error: '?????? ????????? ?????? ???????????????.' };
            }

            if (question.kind !== answer.kind) {
              return { ok: false, error: '????????? ????????? ????????? ????????????.' };
            }

            if (type === QuestionType.Closed) {
              if ((<ClosedAnswer>answer).closedAnswer.length === 0) {
                return { ok: false, error: '????????? ????????????.' };
              }

              if (
                (<ClosedQuestion>question).closedType === ClosedQuestionType.One
              ) {
                if ((<ClosedAnswer>answer).closedAnswer.length > 1) {
                  return {
                    ok: false,
                    error:
                      '???????????? ?????? ??????????????? ???????????? ????????? ??????????????????',
                  };
                }

                const choices = question.choices.map((choice) => choice.no);

                if (
                  !(<ClosedAnswer>answer).closedAnswer.every((v) =>
                    choices.includes(v),
                  )
                ) {
                  return { ok: false, error: '?????? ???????????????' };
                }

                //question??? ???????????? ????????? ??????
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
                    error: '?????? ????????? ????????? ?????? ????????? ????????? ????????????.',
                  };
                }
              }
            } else if (type === QuestionType.Linear) {
              const { leftRange, rightRange } = <LinearQuestion>question;
              const { linearAnswer } = <LinearAnswer>answer;
              if (leftRange > linearAnswer || linearAnswer > rightRange) {
                return {
                  ok: true,
                  error: '??????????????? ????????? ??????????????????.',
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
                    error: '????????? ????????? ????????? ????????????.',
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
                    error: '????????? ???????????? ????????? ????????????.',
                  };
                }
                //???????????? ?????? ??? ??? ?????? ??? ??????
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
            return { ok: false, error: '?????? ?????? ????????? ????????????.' };
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

      //form??? ?????? ???????????? ???????????? select
      if (!submission) {
        return { ok: false, error: '????????? ?????? ??? ????????????.' };
      }

      if (
        submission.respondent?.toString() !== owner._id.toString() &&
        submission.form?.owner.toString() !== owner._id.toString()
      ) {
        return { ok: false, error: '????????? ????????????.' };
      }

      return { ok: true, submission };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  //findSubmissionById??? ???????????? ?????????, ????????? ????????? ?????? ??? ?????? ??????
  //???????????? ????????? ??? ????????? ??? ????
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

        //?????? ???????????? ????????? ???????????? ?????? ????????? ??????????????? ????????? ???????????? ???

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

  async setFavoriteSubmissions(
    owner: User,
    { formId, favoriteSubmissions }: SetFavoriteSubmissionsInput,
  ): Promise<SetFavoriteSubmissionsOutput> {
    try {
      const form = await this.formModel
        .findOne({ _id: formId })
        .populate('owner');

      if (form.owner._id.toString() !== owner._id.toString()) {
        return { ok: false, error: '????????? ????????????.' };
      }

      const submissions = form.submissions.map((submission) =>
        submission.toString(),
      );

      if (
        !favoriteSubmissions.every((submission) =>
          submissions.includes(submission.submissionId),
        )
      ) {
        return { ok: false, error: '??? ?????? ?????? ???????????????.' };
      }

      const falseSubmissionIds: string[] = [];
      const trueSubmissionIds: string[] = [];

      for (const { isFavorite, submissionId } of favoriteSubmissions) {
        if (isFavorite) {
          trueSubmissionIds.push(submissionId);
        } else {
          falseSubmissionIds.push(submissionId);
        }
      }

      await this.submissionModel.updateMany({ _id: falseSubmissionIds }, [
        { $set: { isFavorite: false } },
      ]);

      await this.submissionModel.updateMany({ _id: trueSubmissionIds }, [
        { $set: { isFavorite: true } },
      ]);

      return { ok: true };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  async findAnswerByQuestionId(
    owner: User,
    { formId, questionId }: FindAnswerByQuestionIdInput,
  ): Promise<FindAnswerByQuestionIdOutput> {
    try {
      const form = await this.formModel.findOne({
        _id: formId,
      });

      if (!form) {
        return {
          ok: false,
          error: '???????????? ?????? ????????????.',
        };
      }

      let question: typeof QuestionUnion;

      for (const section of form.sections) {
        question = section.questions.find(
          (question) => question._id.toString() === questionId,
        );
      }

      if (!question) {
        return { ok: false, error: '???????????? ?????? ???????????????.' };
      }

      if (form.owner.toString() !== owner._id.toString()) {
        return { ok: false, error: '????????? ????????????.' };
      }

      let answers = await this.formModel.aggregate([
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
          $project: {
            'submissions.isFavorite': true,
            'submissions.answers': true,
            'submissions._id': true,
            _id: false,
          },
        },
      ]);

      const answersArg: AnswersInFindAnswerByQuestionId[] = answers.map(
        (answer) => {
          return {
            answer: answer.submissions.answers,
            submissionId: answer.submissions._id,
            isFavorite: answer.submissions.isFavorite,
          };
        },
      );

      return { ok: true, answers: answersArg, question };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }
}
