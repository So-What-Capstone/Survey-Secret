import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { virtualSchemaOption } from 'src/common/schemas/option.schema';
import { IsEnum, IsMongoId } from 'class-validator';
import {
  QuestionType,
  QuestionUnion,
} from './../../../forms/questions/question.typeDefs';

@ObjectType()
@Schema({ ...virtualSchemaOption, discriminatorKey: 'kind' })
export class Answer {
  //ref에 ClosedQuestion등 세부적으로 저장되는지 보기
  @Field((type) => String)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Question' })
  @IsMongoId()
  question: string;

  @Field((type) => QuestionType)
  @Prop({ type: String, required: true, enum: QuestionType })
  @IsEnum(QuestionType)
  kind: QuestionType;
}

export const AnswerSchema = SchemaFactory.createForClass(Answer);
