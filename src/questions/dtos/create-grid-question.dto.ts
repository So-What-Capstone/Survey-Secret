import {
  InputType,
  ObjectType,
  PickType,
  IntersectionType,
} from '@nestjs/graphql';
import { CoreOutput } from './../../common/dtos/output.dto';
import { GridQuestion } from './../schemas/grid-question.scheam';
import { CreateQuestionInput } from './create-question.dto';

@InputType()
export class CreateGridQuestionInput extends IntersectionType(
  CreateQuestionInput,
  PickType(GridQuestion, ['rowContent', 'colContent', 'type']),
) {}

@ObjectType()
export class CreateGridQuestionOutput extends CoreOutput {}
