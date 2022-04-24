import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import {
  QuestionType,
  QuestionUnionType,
} from '../questions/question.typeDefs';
import { IsMongoId, IsString, MaxLength } from 'class-validator';

export type SectionDocument = Section & Document;

@InputType('SectionInputType', { isAbstract: true })
@ObjectType()
@Schema({ toJSON: { virtuals: true } })
export class Section {
  @Field((type) => String)
  @IsMongoId()
  _id: mongoose.Schema.Types.ObjectId;

  @Field((type) => String, { nullable: true })
  @Prop({ type: String, trim: true, maxlength: 50 })
  @IsString()
  @MaxLength(50)
  title?: string;

  //mongoDB union type 없음
  //DB에서 validate불가능... question validate할 수 있는 방법 찾아보기
  @Field((type) => [QuestionUnionType], { nullable: true })
  @Prop({
    type: [
      {
        question: { type: mongoose.Schema.Types.Mixed },
        type: { type: String, enum: QuestionType },
      },
    ],
  })
  questions?: QuestionUnionType[];

  //add trigger ID
}

export const SectionSchema = SchemaFactory.createForClass(Section);
