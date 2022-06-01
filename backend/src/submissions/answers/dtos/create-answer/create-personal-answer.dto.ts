import { InputType, IntersectionType, PickType } from '@nestjs/graphql';
import { CommonCreateAnswerInput } from '../common-create-answer.dto';
import { PersonalAnswer } from '../../schemas/personal-answer.schema';

@InputType()
export class CreatePersonalAnswerInput extends IntersectionType(
  CommonCreateAnswerInput,
  PickType(PersonalAnswer, ['personalAnswer']),
) {}
