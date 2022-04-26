import {
  InputType,
  ObjectType,
  Field,
  registerEnumType,
} from '@nestjs/graphql';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { IsEnum, IsOptional } from 'class-validator';
import { Question } from './question.schema';

export enum OpenedQuestionType {
  Default = 'Default',
  Date = 'Date',
  Time = 'Time',
  Address = 'Address',
  File = 'File',
}

registerEnumType(OpenedQuestionType, { name: 'OpenedQuestionType' });

export type OpenedQuestionDocument = OpenedQuestion & Document;

@InputType('OpenedQuestionInputType', { isAbstract: true })
@ObjectType()
export class OpenedQuestion extends Question {
  @Field((type) => OpenedQuestionType, { nullable: true })
  @Prop({
    type: String,
    enum: OpenedQuestionType,
    default: OpenedQuestionType.Default,
    required: true,
  })
  @IsEnum(OpenedQuestionType)
  @IsOptional()
  type?: OpenedQuestionType;
}

export const OpenedQuestionSchema =
  SchemaFactory.createForClass(OpenedQuestion);
