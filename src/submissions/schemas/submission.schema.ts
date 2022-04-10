import { InputType, Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CoreSchema } from './../../common/schemas/core.schema';
import { schemaOption } from './../../common/schemas/option.schema';
import { User } from '../../users/schemas/user.schema';
import mongoose from 'mongoose';
import { Form } from './../../forms/schemas/form.schema';

export type SubmissionDocument = Submission & Document;

@InputType('SubmissionInputType', { isAbstract: true })
@ObjectType()
@Schema(schemaOption)
export class Submission extends CoreSchema {
  @Field((type) => User, { nullable: true })
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  respondent?: User;

  @Field((type) => Form)
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Form',
    required: true,
  })
  form: Form;

  //add answers properties
}

export const SubmissionSchema = SchemaFactory.createForClass(Submission);