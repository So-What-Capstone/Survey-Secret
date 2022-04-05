import {
  registerEnumType,
  InputType,
  ObjectType,
  Field,
} from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

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
export class ClosedQuestion {
  @Field((type) => String)
  @Prop({ type: String, trim: true, required: true })
  content: string;

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

  @Field((type) => String, { nullable: true })
  @Prop({ type: String, trim: true })
  description?: string;

  @Field((type) => Boolean, { nullable: true })
  @Prop({ type: Boolean, default: false })
  required?: boolean;

  @Field((type) => ClosedQuestionType, { nullable: true })
  @Prop({
    type: String,
    enum: ClosedQuestionType,
    default: ClosedQuestionType.One,
    required: true,
  })
  type?: ClosedQuestionType;

  @Field((type) => Number)
  @Prop({ type: Number, unique: true })
  order: Number;
}

export const ClosedQuestionSchema =
  SchemaFactory.createForClass(ClosedQuestion);
