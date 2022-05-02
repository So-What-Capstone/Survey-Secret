import {
  Field,
  InputType,
  IntersectionType,
  ObjectType,
  PickType,
} from '@nestjs/graphql';
import { GridAnswer } from '../../schemas/grid-answer.schema';
import { CoreOutput } from '../../../../common/dtos/output.dto';
import { QuestionType } from '../../../../forms/questions/question.typeDefs';
import { CommonCreateAnswerInput } from '../common-create-answer.dto';

@InputType()
export class CreateGridAnswerInput extends IntersectionType(
  PickType(GridAnswer, ['content']),
  CommonCreateAnswerInput,
) {}

@ObjectType()
export class CreateLinearAnswerOutput extends CoreOutput {}
