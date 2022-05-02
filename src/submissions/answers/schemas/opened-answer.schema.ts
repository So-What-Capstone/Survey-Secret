import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { schemaOptionExceptDate } from 'src/common/schemas/option.schema';
import { Answer } from './answer.schema';
import { OpenedQuestion } from '../../../forms/questions/schemas/opened-question.schema';
import mongoose from 'mongoose';
import { virtualSchemaOption } from './../../../common/schemas/option.schema';
import { QuestionType } from '../../../forms/questions/question.typeDefs';
import { IsEnum } from 'class-validator';

export type OpenedAnswerDocument = OpenedAnswer & Document;

@InputType('OpenedAnswerInputType', { isAbstract: true })
@ObjectType()
@Schema(virtualSchemaOption)
export class OpenedAnswer {
  @Field((type) => String)
  question: string;

  @Field((type) => QuestionType)
  @IsEnum(QuestionType)
  kind: QuestionType;

  @Field((type) => String, { nullable: true })
  @Prop({ type: String, trim: true })
  content?: string;

  // @Field((type) => OpenedQuestion)
  // @Prop({
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'OpenedQuestion',
  //   required: true,
  // })
  // openedQuestion: OpenedQuestion;
}

export const OpenedAnswerSchema = SchemaFactory.createForClass(OpenedAnswer);
