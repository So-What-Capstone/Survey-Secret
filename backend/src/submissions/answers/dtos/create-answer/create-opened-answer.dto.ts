import {
  InputType,
  IntersectionType,
  ObjectType,
  PickType,
} from '@nestjs/graphql';
import { OpenedAnswer } from '../../schemas/opened-answer.schema';
import { CoreOutput } from '../../../../common/dtos/output.dto';
import { CommonCreateAnswerInput } from '../common-create-answer.dto';

@InputType()
export class CreateOpenedAnswerInput extends IntersectionType(
  PickType(OpenedAnswer, ['openedAnswer']),
  CommonCreateAnswerInput,
) {}

@ObjectType()
export class CreateOpenedAnswerOutput extends CoreOutput {}
