import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { LinearQuestion } from '../schemas/linear-question.schema';
import { CoreOutput } from './../../common/dtos/output.dto';

@InputType()
export class CreateLinearQuestionInput extends PickType(LinearQuestion, [
  'content',
  'leftLabel',
  'order',
  'rightLabel',
  'leftRange',
  'rightRange',
  'description',
  'required',
]) {}

@ObjectType()
export class CreateLinearQuestionOutput extends CoreOutput {}
