import { InputType, Field, PickType } from '@nestjs/graphql';
import { Question } from '../schemas/question.schema';

@InputType()
export class CommonCreateQuestionInput extends PickType(Question, [
  'content',
  'description',
  'required',
  'order',
  'kind',
]) {}
