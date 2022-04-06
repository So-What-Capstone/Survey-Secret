import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from './../../common/dtos/output.dto';
import { GridQuestion } from './../schemas/grid-question.scheam';

@InputType()
export class CreateGridQuestionInput extends PickType(GridQuestion, [
  'content',
  'rowContent',
  'colContent',
  'description',
  'required',
  'order',
  'type',
]) {}

@ObjectType()
export class CreateGridQuestionOutput extends CoreOutput {}
