import { Module } from '@nestjs/common';
import { AnswersService } from './answers.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Submission, SubmissionSchema } from '../schemas/submission.schema';
import {
  ClosedAnswer,
  ClosedAnswerSchema,
} from './schemas/closed-answer.schema';
import { AnswersResolver } from './answers.resolver';
import {
  ClosedQuestion,
  ClosedQuestionSchema,
} from '../../forms/questions/schemas/closed-question.schema';
import {
  LinearQuestionSchema,
  LinearQuestion,
} from '../../forms/questions/schemas/linear-question.schema';
import {
  LinearAnswer,
  LinearAnswerSchema,
} from './schemas/linear-answer.schema';
import { SubmissionsModule } from '../submissions.module';
import { QuestionsModule } from '../../forms/questions/questions.module';
import {
  OpenedAnswer,
  OpenedAnswerSchema,
} from './schemas/opened-answer.schema';
import {
  OpenedQuestion,
  OpenedQuestionSchema,
} from '../../forms/questions/schemas/opened-question.schema';

@Module({
  imports: [SubmissionsModule, QuestionsModule],
  providers: [AnswersService, AnswersResolver],
  exports: [AnswersService],
})
export class AnswersModule {}
