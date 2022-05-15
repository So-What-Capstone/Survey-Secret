import {
  InputType,
  ObjectType,
  PickType,
  IntersectionType,
  Field,
} from '@nestjs/graphql';
import { CoreOutput } from '../../../common/dtos/output.dto';
import { OpenedQuestion } from '../schemas/opened-question.schema';
import { CommonCreateQuestionInput } from './common-create-question.dto';
import { QuestionType } from '../question.typeDefs';

@InputType()
export class CreateOpenedQuestionInput extends IntersectionType(
  CommonCreateQuestionInput,
  PickType(OpenedQuestion, ['openedType']),
) {}

@ObjectType()
export class CreateOpenedQuestionOutput extends CoreOutput {}
