import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { virtualSchemaOption } from './../../../common/schemas/option.schema';
import {
  IsOptional,
  IsString,
  IsBoolean,
  IsNumber,
  MaxLength,
  IsEnum,
} from 'class-validator';
import { QuestionType } from '../question.typeDefs';

//question마다 공통으로 가지는 class
@InputType('QuestionInputType', { isAbstract: true })
@ObjectType()
@Schema({ ...virtualSchemaOption, discriminatorKey: 'kind' })
export class Question {
  @Field((type) => String)
  _id: string;

  @Field((type) => String)
  @Prop({ type: String, trim: true, required: true, maxlength: 300 })
  @MaxLength(300)
  @IsString()
  content: string;

  @Field((type) => QuestionType)
  @Prop({ type: String, required: true, enum: QuestionType })
  @IsEnum(QuestionType)
  kind: QuestionType;

  @Field((type) => String, { nullable: true })
  @Prop({ type: String, trim: true, maxlength: 300 })
  @MaxLength(300)
  @IsString()
  @IsOptional()
  description?: string;

  @Field((type) => Boolean, { nullable: true })
  @Prop({ type: Boolean, required: true, default: false })
  @IsBoolean()
  @IsOptional()
  required?: boolean;

  @Field((type) => Number)
  @Prop({ type: Number })
  @IsNumber()
  order: number;
}

export const QuestionSchema = SchemaFactory.createForClass(Question);
