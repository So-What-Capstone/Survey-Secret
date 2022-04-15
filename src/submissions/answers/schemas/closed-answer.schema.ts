import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { schemaOptionExceptDate } from '../../../common/schemas/option.schema';
import mongoose from 'mongoose';
import { ClosedQuestion } from '../../../forms/questions/schemas/closed-question.schema';
import { Answer } from './answer.schema';

export type ClosedAnswerDocument = ClosedAnswer & Document;

@InputType('ClosedAnswerInputType', { isAbstract: true })
@ObjectType()
export class ClosedAnswer extends Answer {
  @Field((type) => [Number])
  @Prop({ type: [Number] })
  no: number[];

  // @Field((type) => ClosedQuestion)
  // @Prop({
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'ClosedQuestion',
  //   required: true,
  // })
  // closedQuestion: ClosedQuestion;
}

export const ClosedAnswerSchema = SchemaFactory.createForClass(ClosedAnswer);
