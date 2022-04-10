import { Field, InputType, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { QuestionType } from '../../questions/question.typeDefs';
import { CoreSchema } from './../../common/schemas/core.schema';
import { schemaOption } from './../../common/schemas/option.schema';
import { Form } from './form.schema';
import { QuestionUnionType } from './../../questions/question.typeDefs';
import { IsNumber, IsString, MaxLength } from 'class-validator';

export type SectionDocument = Section & Document;

@InputType('SectionInputType', { isAbstract: true })
@ObjectType()
@Schema(schemaOption)
export class Section extends CoreSchema {
  @Field((type) => String)
  @Prop({ type: String, required: true, trim: true, maxlength: 50 })
  @IsString()
  @MaxLength(50)
  title: string;

  @Field((type) => Number)
  @Prop({ type: Number })
  @IsNumber()
  order: number;

  @Field((type) => Form)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Form', required: true })
  form: Form;

  @Field((type) => [QuestionUnionType], { nullable: true })
  @Prop({
    type: [
      {
        question: {
          type: mongoose.Schema.Types.ObjectId,
          refPath: 'questions.type',
        },
        type: { type: String },
      },
    ],
  })
  questions?: QuestionType[];

  //add trigger ID
}

export const SectionSchema = SchemaFactory.createForClass(Section);