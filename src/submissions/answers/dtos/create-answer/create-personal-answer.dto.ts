import { Field, InputType, IntersectionType, PickType } from '@nestjs/graphql';
import { QuestionType } from '../../../../forms/questions/question.typeDefs';
import { CommonCreateAnswerInput } from '../common-create-answer.dto';
import { PersonalAnswer } from '../../schemas/personal-answer.schema';

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
