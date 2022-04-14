import { Field, InputType, IntersectionType, PickType } from '@nestjs/graphql';
import { CommonCreateAnswerInput } from './common-create-answer.dto';
import { PersonalAnswer } from './../schemas/personal-answer.schema';
import { QuestionType } from 'src/questions/question.typeDefs';

@InputType()
export class CreatePersonalAnswerInputType extends IntersectionType(
  CommonCreateAnswerInput,
  PickType(PersonalAnswer, ['content']),
) {}

@InputType()
export class CreatePersonalAnswerInput {
  @Field((type) => CreatePersonalAnswerInputType)
  answer: CreatePersonalAnswerInputType;

  @Field((type) => QuestionType)
  type: string;
}
