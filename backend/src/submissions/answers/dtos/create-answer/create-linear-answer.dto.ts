import {
  InputType,
  PickType,
  IntersectionType,
  ObjectType,
} from '@nestjs/graphql';
import { LinearAnswer } from '../../schemas/linear-answer.schema';
import { CoreOutput } from '../../../../common/dtos/output.dto';
import { CommonCreateAnswerInput } from '../common-create-answer.dto';

@InputType()
export class CreateLinearAnswerInput extends IntersectionType(
  PickType(LinearAnswer, ['linearAnswer']),
  CommonCreateAnswerInput,
) {}

@ObjectType()
export class CreateLinearAnswerOutput extends CoreOutput {}
