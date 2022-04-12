import {
  Field,
  InputType,
  PickType,
  IntersectionType,
  ObjectType,
} from '@nestjs/graphql';
import { LinearAnswer } from '../schemas/linear-answer.schema';
import { CreateAnswerInput } from './create-answer.dto';
import { CoreOutput } from './../../common/dtos/output.dto';

@InputType()
export class CreateLinearAnswerInput extends IntersectionType(
  PickType(LinearAnswer, ['no']),
  CreateAnswerInput,
) {}

@ObjectType()
export class CreateLinearAnswerOutput extends CoreOutput {}
