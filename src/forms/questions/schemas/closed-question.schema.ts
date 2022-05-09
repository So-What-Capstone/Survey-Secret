import {
  registerEnumType,
  InputType,
  ObjectType,
  Field,
} from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEnum, IsMongoId } from 'class-validator';
import mongoose from 'mongoose';
import { virtualSchemaOption } from './../../../common/schemas/option.schema';
import { QuestionType } from '../question.typeDefs';

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

  @Field((type) => String, { nullable: true })
  @IsMongoId()
  activatedSection?: string;
}

@InputType('ClosedQuestionInputType', { isAbstract: true })
@ObjectType()
@Schema(virtualSchemaOption)
export class ClosedQuestion {
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

  @Field((type) => [ClosedQuestionChoice])
  @Prop({
    type: [
      {
        //unique동작 안함 좀 더 찾아보기
        no: { type: Number, required: true },
        choice: { type: String, required: true },
        activatedSection: {
          type: mongoose.Schema.Types.ObjectId,
          ref: 'Section',
        },
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
  closedType?: ClosedQuestionType;
}

export const ClosedQuestionSchema =
  SchemaFactory.createForClass(ClosedQuestion);
