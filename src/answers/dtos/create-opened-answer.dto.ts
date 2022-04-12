import {
  InputType,
  IntersectionType,
  ObjectType,
  PickType,
} from '@nestjs/graphql';
import { OpenedAnswer } from '../schemas/opened-answer.schema';
import { CreateAnswerInput } from './create-answer.dto';
import { CoreOutput } from './../../common/dtos/output.dto';

@InputType()
export class CreateOpenedAnswerInput extends IntersectionType(
  PickType(OpenedAnswer, ['content']),
  CreateAnswerInput,
) {}

@ObjectType()
export class CreateOpenedAnswerOutput extends CoreOutput {}
