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

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: ClosedQuestion.name,
        schema: ClosedQuestionSchema,
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
