import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateAnswerInput {
  @Field((type) => String)
  submissionId: string;

  @Field((type) => String)
  questionId: string;
}
