import { Prop, Schema, SchemaOptions, SchemaFactory } from '@nestjs/mongoose';
import { CoreSchema } from './../../common/schemas/core.schema';
import {
  ObjectType,
  InputType,
  Field,
  registerEnumType,
} from '@nestjs/graphql';
import {
  IsBoolean,
  IsEnum,
  IsMongoId,
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { User } from '../../users/schemas/user.schema';
import mongoose from 'mongoose';
import { schemaOption } from './../../common/schemas/option.schema';
import { Section, SectionSchema } from './section.schema';
import { Submission } from '../../submissions/schemas/submission.schema';
import { Question } from './../questions/schemas/question.schema';

export enum FormState {
  Template = 'Template',
  Ready = 'Ready',
  InProgress = 'InProgress',
  Expired = 'Expired',
}

registerEnumType(FormState, { name: 'FormState' });

export type FormDocument = Form & Document;

@InputType('FormInputType', { isAbstract: true })
@ObjectType()
@Schema(schemaOption)
export class Form extends CoreSchema {
  @Field((type) => String)
  @IsMongoId()
  _id: string;

  @Field((type) => String)
  @Prop({ type: String, required: true, trim: true, maxlength: 50 })
  @IsString()
  @MaxLength(50)
  title: string;

  @Field((type) => String, { nullable: true })
  @Prop({ type: String, maxlength: 300 })
  @IsString()
  @MaxLength(300)
  @IsOptional()
  description?: string;

  @Field((type) => FormState)
  @Prop({
    type: String,
    enum: FormState,
    required: true,
    // default: FormState.Ready,
  })
  @IsEnum(FormState)
  state: FormState;

  @Field((type) => Boolean)
  @Prop({ type: Boolean, default: false })
  @IsBoolean()
  isPromoted: boolean;

  @Field((type) => Date, { nullable: true })
  @Prop({
    type: Date,
    default: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
  })
  expiredAt?: Date;

  @Field((type) => Date, { nullable: true })
  @Prop({
    type: Date,
    default: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000),
  })
  privacyExpiredAt: Date;

  @Field((type) => User)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  owner: User;

  @Field((type) => [Section], { nullable: true })
  @Prop({ type: [SectionSchema] })
  sections?: Section[];

  @Field((type) => [Submission], { nullable: true })
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Submission' }] })
  submissions?: Submission[];

  @Field((type) => Question, { nullable: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Question' })
  representativeQuestion?: Question;
}

export const FormSchema = SchemaFactory.createForClass(Form);
