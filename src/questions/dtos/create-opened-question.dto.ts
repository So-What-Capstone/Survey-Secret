import {
  InputType,
  ObjectType,
  PickType,
  IntersectionType,
} from '@nestjs/graphql';
import { CoreOutput } from './../../common/dtos/output.dto';
import { OpenedQuestion } from './../schemas/opened-question.schema';
import { CreateQuestionInput } from './create-question.dto';

@InputType()
export class CreateOpenedQuestionInput extends IntersectionType(
  CreateQuestionInput,
  PickType(OpenedQuestion, ['type']),
) {}

@ObjectType()
export class CreateOpenedQuestionOutput extends CoreOutput {}
