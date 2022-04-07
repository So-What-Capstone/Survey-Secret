import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { ClosedQuestion } from '../schemas/closed-question.schema';
import { CoreOutput } from './../../common/dtos/output.dto';

@InputType()
export class CreateClosedQuestionInput extends PickType(ClosedQuestion, [
  'content',
  'choices',
  'description',
  'required',
  'order',
  'type',
]) {
  @Field((type) => String)
  sectionId: string;
}

@ObjectType()
export class CreateClosedQuestionOutput extends CoreOutput {}
