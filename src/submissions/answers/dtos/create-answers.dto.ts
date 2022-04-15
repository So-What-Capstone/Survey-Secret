import { Field, InputType } from '@nestjs/graphql';
import { CreateClosedAnswerInput } from './create-answer/create-closed-answer.dto';
import { CreateGridAnswerInput } from './create-answer/create-grid-answer.dto';
import { CreateLinearAnswerInput } from './create-answer/create-linear-answer.dto';
import { CreateOpenedAnswerInput } from './create-answer/create-opened-answer.dto';
import { CreatePersonalAnswerInput } from './create-answer/create-personal-answer.dto';

@InputType()
export class CreateAnswersInput {
  @Field((type) => [CreateOpenedAnswerInput], { nullable: true })
  opened?: CreateOpenedAnswerInput[];

  @Field((type) => [CreateClosedAnswerInput], { nullable: true })
  closed?: CreateClosedAnswerInput[];

  @Field((type) => [CreateLinearAnswerInput], { nullable: true })
  linear?: CreateLinearAnswerInput[];

  @Field((type) => [CreateGridAnswerInput], { nullable: true })
  grid?: CreateGridAnswerInput[];

  @Field((type) => [CreatePersonalAnswerInput], { nullable: true })
  personal?: CreatePersonalAnswerInput[];
}
