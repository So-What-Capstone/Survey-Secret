import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { Question } from './question.schema';
import { IsEnum } from 'class-validator';

export enum GridQuestionType {
  One = 'One',
  Multiple = 'Multiple',
}

registerEnumType(GridQuestionType, { name: 'GridQuestionType' });

export type GridQuestionDocument = GridQuestion & Document;

@InputType('GridQuestionInputType', { isAbstract: true })
@ObjectType()
export class GridQuestion extends Question {
  @Field((type) => [String], { nullable: true })
  @Prop({ type: [{ type: String, trim: true }] })
  rowContent?: string[];

  @Field((type) => [String], { nullable: true })
  @Prop({ type: [{ type: String, trim: true }] })
  colContent?: string[];

  @Field((type) => GridQuestionType, { nullable: true })
  @Prop({
    type: String,
    enum: GridQuestionType,
    default: GridQuestionType.One,
    required: true,
  })
  @IsEnum(GridQuestionType)
  type?: GridQuestionType;
}

export const GridQuestionSchema = SchemaFactory.createForClass(GridQuestion);
