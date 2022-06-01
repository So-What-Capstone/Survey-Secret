import {
  InputType,
  ObjectType,
  PickType,
  IntersectionType,
  Field,
} from '@nestjs/graphql';
import { CoreOutput } from '../../../common/dtos/output.dto';
import { GridQuestion } from '../schemas/grid-question.scheam';
import { CommonCreateQuestionInput } from './common-create-question.dto';
import { QuestionType } from 'src/forms/questions/question.typeDefs';

@InputType()
export class CreateGridQuestionInput extends IntersectionType(
  CommonCreateQuestionInput,
  PickType(GridQuestion, ['rowContent', 'colContent']),
) {}

@ObjectType()
export class CreateGridQuestionOutput extends CoreOutput {}
