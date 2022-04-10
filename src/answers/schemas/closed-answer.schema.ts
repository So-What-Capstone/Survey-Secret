import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Submission } from '../../submissions/schemas/submission.schema';
import { schemaOptionExceptDate } from '../../common/schemas/option.schema';
import mongoose from 'mongoose';
import { ClosedQuestion } from '../../questions/schemas/closed-question.schema';

export type ClosedAnswerDocument = ClosedAnswer & Document;

@InputType('ClosedAnswerInput', { isAbstract: true })
@ObjectType()
@Schema(schemaOptionExceptDate)
export class ClosedAnswer {
  @Field((type) => [Number])
  @Prop({ type: [Number] })
  no: number[];

  @Field((type) => Submission)
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Submission',
    required: true,
  })
  submission: Submission;

  @Field((type) => ClosedQuestion)
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ClosedQuestion',
    required: true,
  })
  closedQuestion: ClosedQuestion;
}

export const ClosedAnswerSchema = SchemaFactory.createForClass(ClosedAnswer);
