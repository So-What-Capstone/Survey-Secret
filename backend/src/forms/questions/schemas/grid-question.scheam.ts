import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsEnum } from 'class-validator';
import { virtualSchemaOption } from './../../../common/schemas/option.schema';
import { QuestionType } from '../question.typeDefs';

export type GridQuestionDocument = GridQuestion & Document;

@InputType('GridQuestionInputType', { isAbstract: true })
@ObjectType()
@Schema(virtualSchemaOption)
export class GridQuestion {
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

  @Field((type) => [String], { nullable: true })
  @Prop({ type: [{ type: String, trim: true }] })
  rowContent?: string[];

  @Field((type) => [String], { nullable: true })
  @Prop({ type: [{ type: String, trim: true }] })
  colContent?: string[];
}

export const GridQuestionSchema = SchemaFactory.createForClass(GridQuestion);
