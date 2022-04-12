import { InputType, ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { schemaOptionExceptDate } from '../../common/schemas/option.schema';
import mongoose from 'mongoose';
import { Answer } from './answer.schema';
import { LinearQuestion } from '../../questions/schemas/linear-question.schema';

export type LinearAnswerDocument = LinearAnswer & Document;

@InputType('LinearAnswerInput', { isAbstract: true })
@ObjectType()
@Schema(schemaOptionExceptDate)
export class LinearAnswer extends Answer {
  @Field((type) => Number)
  @Prop({ type: Number })
  no: number;

  @Field((type) => LinearQuestion)
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'LinearQuestion',
    required: true,
  })
  linearQuestion: LinearQuestion;
}

export const LinearAnswerSchema = SchemaFactory.createForClass(LinearAnswer);
