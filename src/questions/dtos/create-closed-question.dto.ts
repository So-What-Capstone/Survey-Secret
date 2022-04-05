import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { ClosedQuestion } from '../schemas/closed-question.schema';
import { CoreOutput } from './../../common/dtos/output.dto';

@InputType()
export class CreateClosedQuestionInput extends PickType(ClosedQuestion, [
  'content',
  'choices',
  'description',
  'required',
  'type',
]) {}

@ObjectType()
export class CreateClosedQuestionOutput extends CoreOutput {}
