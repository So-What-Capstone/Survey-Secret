import { Field, ObjectType } from '@nestjs/graphql';
import mongoose from 'mongoose';

@ObjectType()
export class Answer {
  @Field((type) => String)
  _id: mongoose.Schema.Types.ObjectId;
}
