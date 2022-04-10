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
    ]),
  ],
  providers: [AnswersService, AnswersResolver],
  exports: [AnswersService],
})
export class AnswersModule {}
