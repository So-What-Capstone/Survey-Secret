import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { schemaOptionExceptDate } from './../../common/schemas/option.schema';
import {
  QuestionType,
  QuestionUnionType,
} from '../questions/question.typeDefs';
import { IsString, MaxLength } from 'class-validator';

export type SectionDocument = Section & Document;

@InputType('SectionInputType', { isAbstract: true })
@ObjectType()
@Schema(schemaOptionExceptDate)
export class Section {
  @Field((type) => String)
  _id: mongoose.Schema.Types.ObjectId;

  @Field((type) => String, { nullable: true })
  @Prop({ type: String, required: true, trim: true, maxlength: 50 })
  @IsString()
  @MaxLength(50)
  title?: string;

  //schema 생성 후 연결하면 _id 생김
  @Field((type) => [QuestionUnionType], { nullable: true })
  @Prop({})
  questions?: QuestionUnionType[];

  //add trigger ID
}

export const SectionSchema = SchemaFactory.createForClass(Section);
