import {
  registerEnumType,
  InputType,
  ObjectType,
  Field,
} from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { schemaOptionExceptDate } from '../../../common/schemas/option.schema';
import { Question } from './question.schema';
import { IsEnum } from 'class-validator';
import mongoose from 'mongoose';

export enum ClosedQuestionType {
  One = 'One',
  Multiple = 'Multiple',
}

registerEnumType(ClosedQuestionType, { name: 'ClosedQuestionType' });

export type ClosedQuestionDocument = ClosedQuestion & Document;

@InputType('ClosedQuestionChoiceInputType', { isAbstract: true })
@ObjectType()
export class ClosedQuestionChoice {
  @Field((type) => Number)
  no: number;

  @Field((type) => String)
  choice: string;
}

@InputType('ClosedQuestionInputType', { isAbstract: true })
@ObjectType()
export class ClosedQuestion extends Question {
  @Field((type) => [ClosedQuestionChoice])
  @Prop({
    type: [
      {
        //unique동작 안함 좀 더 찾아보기
        no: { type: Number, unique: true, required: true },
        choice: { type: String, required: true },
      },
    ],
    required: true,
  })
  choices: ClosedQuestionChoice[];

  //type을 이렇게 정의 하는 것보다, 몇개를 고를 수 있게 할건지에 대한 field를 number로 두는게 더 나은듯
  @Field((type) => ClosedQuestionType, { nullable: true })
  @Prop({
    type: String,
    enum: ClosedQuestionType,
    default: ClosedQuestionType.One,
    required: true,
  })
  @IsEnum(ClosedQuestionType)
  type?: ClosedQuestionType;
}

export const ClosedQuestionSchema =
  SchemaFactory.createForClass(ClosedQuestion);
