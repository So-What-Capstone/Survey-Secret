import {
  registerEnumType,
  InputType,
  ObjectType,
  Field,
} from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Question } from './question.schema';

export enum ClosedQuestionType {
  One = 'One',
  Multiple = 'Multiple',
}

registerEnumType(ClosedQuestionType, { name: 'ClosedQuestionType' });

export type ClosedQuestionDocument = ClosedQuestion & Document;

@InputType('ClosedQuestionChoiceTypeInput', { isAbstract: true })
@ObjectType()
export class ClosedQuestionChoiceType {
  @Field((type) => Number)
  no: number;

  @Field((type) => String)
  choice: string;
}

@InputType('ClosedQuestionInputType', { isAbstract: true })
@ObjectType()
@Schema({ autoIndex: true })
export class ClosedQuestion extends Question {
  @Field((type) => [ClosedQuestionChoiceType])
  @Prop({
    type: [
      {
        //unique동작 안함 좀 더 찾아보기
        no: { type: Number, unique: true },
        choice: { type: String },
      },
    ],
    required: true,
  })
  choices: ClosedQuestionChoiceType[];

  @Field((type) => ClosedQuestionType, { nullable: true })
  @Prop({
    type: String,
    enum: ClosedQuestionType,
    default: ClosedQuestionType.One,
    required: true,
  })
  type?: ClosedQuestionType;
}

export const ClosedQuestionSchema =
  SchemaFactory.createForClass(ClosedQuestion);
