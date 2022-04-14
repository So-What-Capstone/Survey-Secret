import { Field, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { Submission } from '../../submissions/schemas/submission.schema';
import mongoose from 'mongoose';
import { AnswerUnionType } from '../answer.typeDefs';

@ObjectType()
export class Answer {
  @Field((type) => String)
  _id: mongoose.Schema.Types.ObjectId;
}
