import {
  InputType,
  ObjectType,
  Field,
  registerEnumType,
} from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEnum, IsOptional, IsString } from 'class-validator';
import { virtualSchemaOption } from './../../../common/schemas/option.schema';
import { QuestionType } from '../question.typeDefs';

export enum OpenedQuestionType {
  Default = 'Default',
  Date = 'Date',
  Time = 'Time',
  Address = 'Address',
  File = 'File',
  Number = 'Number',
}

registerEnumType(OpenedQuestionType, { name: 'OpenedQuestionType' });

export type OpenedQuestionDocument = OpenedQuestion & Document;

@InputType('OpenedQuestionInputType', { isAbstract: true })
@ObjectType()
@Schema(virtualSchemaOption)
export class OpenedQuestion {
  @Field((type) => String)
  _id: string;

  @Field((type) => String)
  content: string;

  @Field((type) => QuestionType)
  kind: QuestionType;

  @Field((type) => String, { nullable: true })
  description?: string;

  @Field((type) => Boolean, { nullable: true })
  required?: boolean;

  @Field((type) => Number)
  order: number;

  @Field((type) => String, { nullable: true })
  @Prop({ type: String })
  @IsString()
  attachment?: string;

  @Field((type) => OpenedQuestionType, { nullable: true })
  @Prop({
    type: String,
    enum: OpenedQuestionType,
    default: OpenedQuestionType.Default,
    required: true,
  })
  @IsEnum(OpenedQuestionType)
  @IsOptional()
  openedType?: OpenedQuestionType;
}

export const OpenedQuestionSchema =
  SchemaFactory.createForClass(OpenedQuestion);
