import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IsBoolean, IsEnum, IsString } from 'class-validator';
import { virtualSchemaOption } from './../../../common/schemas/option.schema';
import { QuestionType } from '../question.typeDefs';

export enum PersonalQuestionType {
  Phone = 'Phone',
  Address = 'Address',
  Email = 'Email',
}
registerEnumType(PersonalQuestionType, { name: 'PersonalQuestionType' });

export type PersonalQuestionDocument = PersonalQuestion & Document;

@InputType('PersonalQuestionInputType', { isAbstract: true })
@ObjectType()
@Schema(virtualSchemaOption)
export class PersonalQuestion {
  @Field((type) => String)
  _id: string;

  @Field((type) => String)
  content: string;

  @Field((type) => QuestionType)
  kind: QuestionType;

  @Field((type) => String, { nullable: true })
  description?: string;

  @Field((type) => Boolean, { nullable: true })
  required?: boolean;

  @Field((type) => Number)
  order: number;

  @Field((type) => String, { nullable: true })
  @Prop({ type: String })
  @IsString()
  attachment?: string;

  @Field((type) => PersonalQuestionType)
  @Prop({ type: String, enum: PersonalQuestionType, required: true })
  @IsEnum(PersonalQuestionType)
  personalType: PersonalQuestionType;
}

export const PersonalQuestionSchema =
  SchemaFactory.createForClass(PersonalQuestion);
