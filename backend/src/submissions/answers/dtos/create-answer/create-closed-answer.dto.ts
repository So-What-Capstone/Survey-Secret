import {
  InputType,
  ObjectType,
  PickType,
  IntersectionType,
} from '@nestjs/graphql';
import { ClosedAnswer } from '../../schemas/closed-answer.schema';
import { CoreOutput } from '../../../../common/dtos/output.dto';
import { CommonCreateAnswerInput } from '../common-create-answer.dto';

@InputType()
export class CreateClosedAnswerInput extends IntersectionType(
  PickType(ClosedAnswer, ['closedAnswer']),
  CommonCreateAnswerInput,
) {}

@ObjectType()
export class CreateClosedAnswerOutput extends CoreOutput {}
