import { InputType, ObjectType, Field } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { virtualSchemaOption } from './../../../common/schemas/option.schema';
import { QuestionType } from '../../../forms/questions/question.typeDefs';
import { IsEnum } from 'class-validator';

export type LinearAnswerDocument = LinearAnswer & Document;

@InputType('LinearAnswerInputType', { isAbstract: true })
@ObjectType()
@Schema(virtualSchemaOption)
export class LinearAnswer {
  @Field((type) => String)
  _id: string;

  @Field((type) => String)
  question: string;

  @Field((type) => QuestionType)
  @IsEnum(QuestionType)
  kind: QuestionType;

  @Field((type) => Number)
  @Prop({ type: Number })
  linearAnswer: number;

  // @Field((type) => LinearQuestion)
  // @Prop({
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'LinearQuestion',
  //   required: true,
  // })
  // linearQuestion: LinearQuestion;
}

export const LinearAnswerSchema = SchemaFactory.createForClass(LinearAnswer);
