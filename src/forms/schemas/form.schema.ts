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
  IsOptional,
  IsString,
  MaxLength,
} from 'class-validator';
import { User } from '../../users/schemas/user.schema';
import mongoose from 'mongoose';
import { schemaOption } from './../../common/schemas/option.schema';
import { Section } from './section.schema';

export enum FormState {
  Ready = 'Ready',
  //뭐라 이름 지을지 모르겠네요...
  Expired = 'Expired',
}

registerEnumType(FormState, { name: 'FormState' });

export type FormDocument = Form & Document;

@InputType('FormInputType', { isAbstract: true })
@ObjectType()
@Schema(schemaOption)
export class Form extends CoreSchema {
  @Field((type) => String)
  @Prop({ type: String, required: true, trim: true, max: 50 })
  @IsString()
  @MaxLength(50)
  title: string;

  @Field((type) => String, { nullable: true })
  @Prop({ type: String, max: 300 })
  @IsString()
  @MaxLength(300)
  @IsOptional()
  description?: string;

  @Field((type) => FormState)
  @Prop({
    type: String,
    enum: FormState,
    required: true,
    default: FormState.Ready,
  })
  @IsEnum(FormState)
  state: string;

  @Field((type) => Boolean)
  @Prop({ type: Boolean, default: false })
  @IsBoolean()
  isPromoted: boolean;

  @Field((type) => Date, { nullable: true })
  @Prop({ type: Date })
  expiredAt?: Date;

  @Field((type) => Date, { nullable: true })
  @Prop({ type: Date })
  privacyExpiredAt: Date;

  @Field((type) => User)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  owner: User;

  @Field((type) => [Section], { nullable: true })
  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Section' })
  sections?: Section[];
}

export const FormSchema = SchemaFactory.createForClass(Form);
