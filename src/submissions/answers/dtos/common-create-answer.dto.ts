import { Field, InputType, PickType } from '@nestjs/graphql';
import { Answer } from '../schemas/answer.schema';

@InputType()
export class CommonCreateAnswerInput extends PickType(Answer, [
  'kind',
  'question',
]) {}
