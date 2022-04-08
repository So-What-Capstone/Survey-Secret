import {
  InputType,
  ObjectType,
  PickType,
  IntersectionType,
} from '@nestjs/graphql';
import { LinearQuestion } from '../schemas/linear-question.schema';
import { CoreOutput } from './../../common/dtos/output.dto';
import { CreateQuestionInput } from './create-question.dto';

@InputType()
export class CreateLinearQuestionInput extends IntersectionType(
  CreateQuestionInput,
  PickType(LinearQuestion, [
    'leftLabel',
    'rightLabel',
    'leftRange',
    'rightRange',
  ]),
) {}

@ObjectType()
export class CreateLinearQuestionOutput extends CoreOutput {}
