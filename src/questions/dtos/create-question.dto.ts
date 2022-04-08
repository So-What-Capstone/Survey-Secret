import { InputType, Field, PickType } from '@nestjs/graphql';
import { Question } from './../schemas/question.schema';

@InputType()
export class CreateQuestionInput extends PickType(Question, [
  'content',
  'description',
  'required',
  'order',
]) {
  @Field((type) => String)
  sectionId: string;
}
