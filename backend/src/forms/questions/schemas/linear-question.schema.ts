import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { virtualSchemaOption } from './../../../common/schemas/option.schema';
import { QuestionType } from '../question.typeDefs';

export type LinearQuestionDocument = LinearQuestion & Document;

@InputType('LinearQuestionInputType', { isAbstract: true })
@ObjectType()
@Schema(virtualSchemaOption)
export class LinearQuestion {
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

  @Field((type) => Number)
  @Prop({ type: Number, required: true })
  @IsNumber()
  leftRange: number;

  @Field((type) => Number)
  @Prop({ type: Number, required: true })
  @IsNumber()
  rightRange: number;

  @Field((type) => String, { nullable: true })
  @Prop({ type: String })
  @IsString()
  @IsOptional()
  leftLabel?: string;

  @Field((type) => String, { nullable: true })
  @Prop({ type: String })
  @IsString()
  @IsOptional()
  rightLabel?: string;

  //촘 몇개의 label이 필요한지 필드가 필요하지 않나??
}

export const LinearQuestionSchema =
  SchemaFactory.createForClass(LinearQuestion);
