import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { IQuestion, QuestionType } from '../../questions/question.typeDefs';
import { CoreSchema } from './../../common/schemas/core.schema';
import { schemaOptionExceptDate } from './../../common/schemas/option.schema';
import { Form } from './form.schema';
import { QuestionUnionType } from './../../questions/question.typeDefs';
import { IsNumber, IsString, MaxLength } from 'class-validator';
import { OpenedQuestionSchema } from 'src/questions/schemas/opened-question.schema';

export type SectionDocument = Section & Document;

@InputType('SectionInputType', { isAbstract: true })
@ObjectType()
@Schema(schemaOptionExceptDate)
export class Section extends CoreSchema {
  @Field((type) => String, { nullable: true })
  @Prop({ type: String, required: true, trim: true, maxlength: 50 })
  @IsString()
  @MaxLength(50)
  title?: string;

  @Field((type) => [QuestionUnionType], { nullable: true })
  @Prop({})
  questions?: IQuestion[];

  //add trigger ID
}

export const SectionSchema = SchemaFactory.createForClass(Section);
