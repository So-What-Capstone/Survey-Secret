import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Answer } from './answer.schema';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { virtualSchemaOption } from './../../../common/schemas/option.schema';
import { QuestionType } from '../../../forms/questions/question.typeDefs';
import { IsEnum } from 'class-validator';

@InputType('GridAnswerContentInputType', { isAbstract: true })
@ObjectType()
export class GridAnswerContent {
  @Field((type) => Number)
  rowNo: number;

  @Field((type) => Number)
  colNo: number;
}

@InputType('GridAnswerInputType', { isAbstract: true })
@ObjectType()
@Schema(virtualSchemaOption)
export class GridAnswer {
  @Field((type) => String)
  question: string;

  @Field((type) => QuestionType)
  @IsEnum(QuestionType)
  kind: QuestionType;

  @Field((type) => [GridAnswerContent], { nullable: true })
  @Prop({
    type: [
      {
        rowNo: { type: Number },
        colNo: { type: Number },
      },
    ],
  })
  content: GridAnswerContent[];
}

export const GridAnswerSchema = SchemaFactory.createForClass(GridAnswer);
