import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CommonCreateAnswerInput {
  @Field((type) => String, { nullable: true })
  questionId?: string;
}
