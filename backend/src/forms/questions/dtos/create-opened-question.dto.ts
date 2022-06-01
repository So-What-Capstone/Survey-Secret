import {
  InputType,
  ObjectType,
  PickType,
  IntersectionType,
} from '@nestjs/graphql';
import { CoreOutput } from '../../../common/dtos/output.dto';
import { OpenedQuestion } from '../schemas/opened-question.schema';
import { CommonCreateQuestionInput } from './common-create-question.dto';

@InputType()
export class CreateOpenedQuestionInput extends IntersectionType(
  CommonCreateQuestionInput,
  PickType(OpenedQuestion, ['openedType', 'attachment']),
) {}

@ObjectType()
export class CreateOpenedQuestionOutput extends CoreOutput {}
