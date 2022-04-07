import { Field, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Section } from '../../forms/schemas/section.schema';

//question마다 공통으로 가지는 class
@ObjectType()
export class Question {
  @Field((type) => String)
  @Prop({ type: String, trim: true, required: true })
  content: string;

  @Field((type) => String, { nullable: true })
  @Prop({ type: String, trim: true })
  description?: string;

  @Field((type) => Boolean, { nullable: true })
  @Prop({ type: Boolean, default: false })
  required?: boolean;

  //왜 order가 default값이 1로 해야함??
  @Field((type) => Number, { nullable: true })
  @Prop({ type: Number, required: true, default: 1 })
  order?: Number;

  @Field((type) => Section)
  @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  section: Section;
}
