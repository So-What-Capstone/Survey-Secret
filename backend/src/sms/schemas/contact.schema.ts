import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { schemaOption } from './../../common/schemas/option.schema';
import { CoreSchema } from './../../common/schemas/core.schema';
import { IsEnum, IsMongoId, IsString } from 'class-validator';
import mongoose from 'mongoose';
import { Submission } from 'src/submissions/schemas/submission.schema';
import { User } from './../../users/schemas/user.schema';
import { Form } from './../../forms/schemas/form.schema';

export enum ContactType {
  SMS = 'SMS',
  EMAIL = 'EMAIL',
}

registerEnumType(ContactType, { name: 'ContactType' });

export type ContactDocument = Contact & Document;

@InputType('ContactInputType', { isAbstract: true })
@ObjectType()
@Schema(schemaOption)
export class Contact extends CoreSchema {
  @Field((type) => String)
  @IsMongoId()
  _id: string;

  @Field((type) => User)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  sender: User;

  @Field((type) => Form)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Form' })
  form: Form;

  @Field((type) => [Submission])
  @Prop({
    type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Submission' }],
  })
  receivers: Submission[];

  @Field((type) => String)
  @Prop({ type: String })
  @IsString()
  content: string;

  @Field((type) => ContactType)
  @Prop({ type: String, enum: ContactType })
  @IsEnum(ContactType)
  contactType: ContactType;
}

export const ContactSchema = SchemaFactory.createForClass(Contact);
