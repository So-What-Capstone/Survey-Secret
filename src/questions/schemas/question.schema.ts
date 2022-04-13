import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import {
  IsOptional,
  IsString,
  IsBoolean,
  IsNumber,
  MaxLength,
} from 'class-validator';
import mongoose from 'mongoose';
import { Section } from '../../forms/schemas/section.schema';

//question마다 공통으로 가지는 class
@ObjectType()
export class Question {
  @Field((type) => String)
  @Prop({ type: String, trim: true, required: true, maxlength: 300 })
  @MaxLength(300)
  @IsString()
  content: string;

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
  @Prop({ type: Number, required: true, index: true })
  @IsNumber()
  @IsOptional()
  order: Number;

  // @Field((type) => Section)
  // @Prop({ type: mongoose.Schema.Types.ObjectId, required: true })
  // section: Section;
}
