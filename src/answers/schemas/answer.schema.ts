import { Field, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { Submission } from '../../submissions/schemas/submission.schema';
import mongoose from 'mongoose';

@ObjectType()
export class Answer {
  @Field((type) => Submission)
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Submission',
    required: true,
  })
  submission: Submission;
}
