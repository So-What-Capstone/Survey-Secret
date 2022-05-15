import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsString } from 'class-validator';
import mongoose from 'mongoose';
import { User } from './user.schema';
import { schemaOption } from '../../common/schemas/option.schema';
import { CoreSchema } from './../../common/schemas/core.schema';

export type VerificationDocument = Verification & Document;

@InputType({ isAbstract: true })
@ObjectType()
@Schema(schemaOption)
export class Verification extends CoreSchema {
  @Field((type) => String)
  @Prop({ type: String, required: true })
  @IsString()
  code: string;

  @Field((type) => User)
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;
}

export const VerificationSchema = SchemaFactory.createForClass(Verification);
