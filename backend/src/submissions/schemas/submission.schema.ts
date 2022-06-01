import { InputType, Field } from '@nestjs/graphql';
import { ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CoreSchema } from './../../common/schemas/core.schema';
import { schemaOption } from './../../common/schemas/option.schema';
import { User } from '../../users/schemas/user.schema';
import mongoose from 'mongoose';
import { Form } from './../../forms/schemas/form.schema';
import { AnswerUnion } from '../answers/answer.typeDefs';
import { QuestionType } from '../../forms/questions/question.typeDefs';
import { IsMongoId } from 'class-validator';
import { AnswerSchema } from '../answers/schemas/answer.schema';
import { ClosedAnswerSchema } from '../answers/schemas/closed-answer.schema';
import { OpenedAnswerSchema } from '../answers/schemas/opened-answer.schema';
import { LinearAnswerSchema } from '../answers/schemas/linear-answer.schema';
import { PersonalAnswerSchema } from '../answers/schemas/personal-answer.schema';
import { GridAnswerSchema } from '../answers/schemas/grid-answer.schema';

export type SubmissionDocument = Submission & Document;

@InputType('SubmissionInputType', { isAbstract: true })
@ObjectType()
@Schema(schemaOption)
export class Submission extends CoreSchema {
  @Field((type) => String)
  @IsMongoId()
  _id: string;

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

  @Field((type) => [AnswerUnion])
  @Prop({
    type: [AnswerSchema],
    required: true,
  })
  answers: typeof AnswerUnion[];
}

export const SubmissionSchema = SchemaFactory.createForClass(Submission);

const answersArraySchema = SubmissionSchema.path(
  'answers',
) as mongoose.Schema.Types.DocumentArray;

answersArraySchema.discriminator(QuestionType.Closed, ClosedAnswerSchema);
answersArraySchema.discriminator(QuestionType.Opened, OpenedAnswerSchema);
answersArraySchema.discriminator(QuestionType.Grid, GridAnswerSchema);
answersArraySchema.discriminator(QuestionType.Linear, LinearAnswerSchema);
answersArraySchema.discriminator(QuestionType.Personal, PersonalAnswerSchema);
