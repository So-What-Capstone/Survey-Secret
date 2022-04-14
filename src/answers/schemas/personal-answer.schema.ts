import { InputType, ObjectType } from '@nestjs/graphql';
import { Answer } from './answer.schema';
import { SchemaFactory, Prop } from '@nestjs/mongoose';
import { Field } from '@nestjs/graphql';

@InputType('PersonalAnswerInputType', { isAbstract: true })
@ObjectType()
export class PersonalAnswer extends Answer {
  @Field((type) => String, { nullable: true })
  @Prop({ type: String, trim: true })
  content?: string;
}

export const PersonalAnswerSchema =
  SchemaFactory.createForClass(PersonalAnswer);
