import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { virtualSchemaOption } from './../../../common/schemas/option.schema';
import { QuestionType } from '../../../forms/questions/question.typeDefs';
import { IsEnum } from 'class-validator';

export type ClosedAnswerDocument = ClosedAnswer & Document;

@InputType('ClosedAnswerInputType', { isAbstract: true })
@ObjectType()
@Schema(virtualSchemaOption)
export class ClosedAnswer {
  @Field((type) => String)
  _id: string;

  @Field((type) => String)
  question: string;

  @Field((type) => QuestionType)
  @IsEnum(QuestionType)
  kind: QuestionType;

  @Field((type) => [Number!])
  @Prop({ type: [{ type: Number, required: true }] })
  closedAnswer: number[];
}

export const ClosedAnswerSchema = SchemaFactory.createForClass(ClosedAnswer);
