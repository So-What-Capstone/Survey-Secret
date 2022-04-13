import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { schemaOptionExceptDate } from 'src/common/schemas/option.schema';
import { Answer } from './answer.schema';
import { OpenedQuestion } from './../../questions/schemas/opened-question.schema';
import mongoose from 'mongoose';

export type OpenedAnswerDocument = OpenedAnswer & Document;

@InputType('OpenedAnswerInput', { isAbstract: true })
@ObjectType()
// @Schema(schemaOptionExceptDate)
export class OpenedAnswer extends Answer {
  @Field((type) => String, { nullable: true })
  @Prop({ type: String, trim: true })
  content?: string;

  // @Field((type) => OpenedQuestion)
  // @Prop({
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'OpenedQuestion',
  //   required: true,
  // })
  // openedQuestion: OpenedQuestion;
}

export const OpenedAnswerSchema = SchemaFactory.createForClass(OpenedAnswer);
