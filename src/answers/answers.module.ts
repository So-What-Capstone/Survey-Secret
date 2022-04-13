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
import {
  OpenedAnswer,
  OpenedAnswerSchema,
} from './schemas/opened-answer.schema';
import {
  OpenedQuestion,
  OpenedQuestionSchema,
} from './../questions/schemas/opened-question.schema';

@Module({
  imports: [SubmissionsModule, QuestionsModule],
  providers: [AnswersService, AnswersResolver],
  exports: [AnswersService],
})
export class AnswersModule {}
