import {
  Field,
  InputType,
  IntersectionType,
  ObjectType,
  PickType,
} from '@nestjs/graphql';
import { ClosedQuestion } from '../schemas/closed-question.schema';
import { CoreOutput } from './../../common/dtos/output.dto';
import { CreateQuestionInput } from './create-question.dto';

@InputType()
export class CreateClosedQuestionInput extends IntersectionType(
  CreateQuestionInput,
  PickType(ClosedQuestion, ['choices', 'type']),
) {}

@ObjectType()
export class CreateClosedQuestionOutput extends CoreOutput {}
