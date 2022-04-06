import { Module } from '@nestjs/common';
import { QuestionsService } from './questions.service';
import { MongooseModule } from '@nestjs/mongoose';
import { QuestionsResolver } from './questions.resolver';
import {
  ClosedQuestion,
  ClosedQuestionSchema,
} from './schemas/closed-question.schema';
import { Section } from '../forms/schemas/section.schema';
import { SectionSchema } from './../forms/schemas/section.schema';
import {
  OpenedQuestion,
  OpenedQuestionSchema,
} from './schemas/opened-question.schema';
import {
  LinearQuestion,
  LinearQuestionSchema,
} from './schemas/linear-question.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ClosedQuestion.name,
        schema: ClosedQuestionSchema,
      },
      {
        name: OpenedQuestion.name,
        schema: OpenedQuestionSchema,
      },
      {
        name: LinearQuestion.name,
        schema: LinearQuestionSchema,
      },
      {
        name: Section.name,
        schema: SectionSchema,
      },
    ]),
  ],
  providers: [QuestionsService, QuestionsResolver],
  exports: [QuestionsService],
})
export class QuestionsModule {}
