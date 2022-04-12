import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { MongooseModule } from '@nestjs/mongoose';
import {
  Submission,
  SubmissionSchema,
} from '../submissions/schemas/submission.schema';
import {
  ClosedAnswer,
  ClosedAnswerSchema,
} from './schemas/closed-answer.schema';
import { AnswersResolver } from './answers.resolver';
import {
  ClosedQuestion,
  ClosedQuestionSchema,
} from '../questions/schemas/closed-question.schema';
import {
  LinearQuestionSchema,
  LinearQuestion,
} from './../questions/schemas/linear-question.schema';
import {
  LinearAnswer,
  LinearAnswerSchema,
} from './schemas/linear-answer.schema';
import { SubmissionsModule } from './../submissions/submissions.module';
import { QuestionsModule } from './../questions/questions.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Submission.name,
        schema: SubmissionSchema,
      },
      {
        name: ClosedAnswer.name,
        schema: ClosedAnswerSchema,
      },
      {
        name: ClosedQuestion.name,
        schema: ClosedQuestionSchema,
      },
      {
        name: LinearQuestion.name,
        schema: LinearQuestionSchema,
      },
      {
        name: LinearAnswer.name,
        schema: LinearAnswerSchema,
      },
    ]),
    SubmissionsModule,
    QuestionsModule,
  ],
  providers: [AnswersService, AnswersResolver],
  exports: [AnswersService],
})
export class AnswersModule {}
