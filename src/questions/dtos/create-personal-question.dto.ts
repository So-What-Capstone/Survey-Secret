import {
  InputType,
  ObjectType,
  PickType,
  IntersectionType,
} from '@nestjs/graphql';
import { PersonalQuestion } from '../schemas/personal-question.schema';
import { CoreOutput } from '../../common/dtos/output.dto';
import { CreateQuestionInput } from './create-question.dto';

@InputType()
export class CreatePersonalQuestionInput extends IntersectionType(
  CreateQuestionInput,
  PickType(PersonalQuestion, ['type', 'encoded']),
) {}

@ObjectType()
export class CreatePersonalQuestionOutput extends CoreOutput {}
