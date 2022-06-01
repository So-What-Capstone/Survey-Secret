import {
  InputType,
  IntersectionType,
  ObjectType,
  PickType,
} from '@nestjs/graphql';
import { GridAnswer } from '../../schemas/grid-answer.schema';
import { CoreOutput } from '../../../../common/dtos/output.dto';
import { CommonCreateAnswerInput } from '../common-create-answer.dto';

@InputType()
export class CreateGridAnswerInput extends IntersectionType(
  PickType(GridAnswer, ['gridAnswer']),
  CommonCreateAnswerInput,
) {}

@ObjectType()
export class CreateLinearAnswerOutput extends CoreOutput {}
