import { InputType, ObjectType } from '@nestjs/graphql';
import { SchemaFactory, Prop, Schema } from '@nestjs/mongoose';
import { Field } from '@nestjs/graphql';
import { QuestionType } from '../../../forms/questions/question.typeDefs';
import { IsEnum } from 'class-validator';
import { virtualSchemaOption } from './../../../common/schemas/option.schema';

@InputType('PersonalAnswerInputType', { isAbstract: true })
@ObjectType()
@Schema(virtualSchemaOption)
export class PersonalAnswer {
  @Field((type) => String)
  _id: string;

  @Field((type) => String)
  question: string;

  @Field((type) => QuestionType)
  @IsEnum(QuestionType)
  kind: QuestionType;

  @Field((type) => String, { nullable: true })
  @Prop({ type: String, trim: true })
  personalAnswer?: string;

  @Field((type) => String, { nullable: true })
  @Prop({ type: String })
  attachment?: string;
}

export const PersonalAnswerSchema =
  SchemaFactory.createForClass(PersonalAnswer);
