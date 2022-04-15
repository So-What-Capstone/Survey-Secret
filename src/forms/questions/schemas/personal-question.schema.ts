import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsBoolean, IsEnum } from 'class-validator';
import { schemaOptionExceptDate } from '../../../common/schemas/option.schema';
import { Question } from './question.schema';

export enum PersonalQuestionType {
  Phone = 'Phone',
  Address = 'Address',
  Email = 'Email',
}
registerEnumType(PersonalQuestionType, { name: 'PersonalQuestionType' });

export type PersonalQuestionDocument = PersonalQuestion & Document;

@InputType('PersonalQuestionInputType', { isAbstract: true })
@ObjectType()
export class PersonalQuestion extends Question {
  @Field((type) => Boolean)
  @Prop({ type: Boolean, required: true, default: true })
  @IsBoolean()
  encoded: boolean;

  @Field((type) => PersonalQuestionType)
  @Prop({ type: String, enum: PersonalQuestionType, required: true })
  @IsEnum(PersonalQuestionType)
  type: PersonalQuestionType;
}

export const PersonalQuestionSchema =
  SchemaFactory.createForClass(PersonalQuestion);
