import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { schemaOptionExceptDate } from '../../common/schemas/option.schema';
import { Question } from './question.schema';

export type LinearQuestionDocument = LinearQuestion & Document;

@InputType('LinearQuestionInputType', { isAbstract: true })
@ObjectType()
@Schema(schemaOptionExceptDate)
export class LinearQuestion extends Question {
  @Field((type) => Number)
  @Prop({ type: Number, required: true })
  leftRange: number;

  @Field((type) => Number)
  @Prop({ type: Number, required: true })
  rightRange: number;

  @Field((type) => String, { nullable: true })
  @Prop({ type: String })
  leftLabel?: string;

  @Field((type) => String, { nullable: true })
  @Prop({ type: String })
  rightLabel?: string;

  //촘 몇개의 label이 필요한지 필드가 필요하지 않나??
}

export const LinearQuestionSchema =
  SchemaFactory.createForClass(LinearQuestion);
