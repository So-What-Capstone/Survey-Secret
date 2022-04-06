import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CoreOutput } from './../../common/dtos/output.dto';
import { OpenedQuestion } from './../schemas/opened-question.schema';

@InputType()
export class CreateOpenedQuestionInput extends PickType(OpenedQuestion, [
  'content',
  'description',
  'required',
  'order',
  'type',
]) {}

@ObjectType()
export class CreateOpenedQuestionOutput extends CoreOutput {}
