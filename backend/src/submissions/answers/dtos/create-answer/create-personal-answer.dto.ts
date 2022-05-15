import { Field, InputType, IntersectionType, PickType } from '@nestjs/graphql';
import { QuestionType } from '../../../../forms/questions/question.typeDefs';
import { CommonCreateAnswerInput } from '../common-create-answer.dto';
import { PersonalAnswer } from '../../schemas/personal-answer.schema';

@InputType()
export class CreatePersonalAnswerInput extends IntersectionType(
  CommonCreateAnswerInput,
  PickType(PersonalAnswer, ['content']),
) {}
