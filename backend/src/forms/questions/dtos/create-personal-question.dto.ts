import {
  InputType,
  ObjectType,
  PickType,
  IntersectionType,
} from '@nestjs/graphql';
import { PersonalQuestion } from '../schemas/personal-question.schema';
import { CoreOutput } from '../../../common/dtos/output.dto';
import { CommonCreateQuestionInput } from './common-create-question.dto';

@InputType()
export class CreatePersonalQuestionInput extends IntersectionType(
  CommonCreateQuestionInput,
  PickType(PersonalQuestion, ['personalType', 'encoded']),
) {}

@ObjectType()
export class CreatePersonalQuestionOutput extends CoreOutput {}
