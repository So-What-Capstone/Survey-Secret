import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { QuestionType, QuestionUnion } from '../questions/question.typeDefs';
import { IsMongoId, IsString, MaxLength, IsNumber } from 'class-validator';
import { ClosedQuestionSchema } from './../questions/schemas/closed-question.schema';
import { OpenedQuestionSchema } from '../questions/schemas/opened-question.schema';
import { GridQuestionSchema } from '../questions/schemas/grid-question.scheam';
import { LinearQuestionSchema } from '../questions/schemas/linear-question.schema';
import { PersonalQuestionSchema } from '../questions/schemas/personal-question.schema';
import { QuestionSchema } from '../questions/schemas/question.schema';

export type SectionDocument = Section & Document;

@InputType('SectionInputType', { isAbstract: true })
@ObjectType()
@Schema({ toJSON: { virtuals: true } })
export class Section {
  @Field((type) => String)
  @IsMongoId()
  _id?: string;

  @Field((type) => String, { nullable: true })
  @Prop({ type: String, trim: true, maxlength: 50 })
  @IsString()
  @MaxLength(50)
  title?: string;

  @Field((type) => [QuestionUnion])
  @Prop({
    type: [QuestionSchema],
    required: true,
  })
  questions: typeof QuestionUnion[];

  @Field((type) => Number)
  @Prop({ type: Number })
  @IsNumber()
  order: number;
}

export const SectionSchema = SchemaFactory.createForClass(Section);

//question discriminator 등록
const questionsArraySchema = SectionSchema.path(
  'questions',
) as mongoose.Schema.Types.DocumentArray;

questionsArraySchema.discriminator(QuestionType.Closed, ClosedQuestionSchema);
questionsArraySchema.discriminator(QuestionType.Opened, OpenedQuestionSchema);
questionsArraySchema.discriminator(QuestionType.Grid, GridQuestionSchema);
questionsArraySchema.discriminator(
  QuestionType.Personal,
  PersonalQuestionSchema,
);
questionsArraySchema.discriminator(QuestionType.Linear, LinearQuestionSchema);
