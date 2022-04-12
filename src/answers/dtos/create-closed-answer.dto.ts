import {
  InputType,
  ObjectType,
  PickType,
  IntersectionType,
} from '@nestjs/graphql';
import { ClosedAnswer } from '../schemas/closed-answer.schema';
import { CoreOutput } from './../../common/dtos/output.dto';
import { CreateAnswerInput } from './create-answer.dto';

@InputType()
export class CreateClosedAnswerInput extends IntersectionType(
  PickType(ClosedAnswer, ['no']),
  CreateAnswerInput,
) {}

@ObjectType()
export class CreateClosedAnswerOutput extends CoreOutput {}
