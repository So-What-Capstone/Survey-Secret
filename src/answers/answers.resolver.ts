import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AnswersService } from './answers.service';
import {
  CreateClosedAnswerInput,
  CreateClosedAnswerOutput,
} from './dtos/create-closed-answer.dto';
import {
  CreateLinearAnswerInput,
  CreateLinearAnswerOutput,
} from './dtos/create-linear-answer.dto';
import {
  CreateOpenedAnswerInput,
  CreateOpenedAnswerOutput,
} from './dtos/create-opened-answer.dto';

@Resolver()
export class AnswersResolver {
  constructor(private readonly answersService: AnswersService) {}

  @Mutation((returns) => CreateClosedAnswerOutput)
  createClosedAnswer(
    @Args('input') createClosedAnswerInput: CreateClosedAnswerInput,
  ): Promise<CreateClosedAnswerOutput> {
    return this.answersService.createClosedAnswer(createClosedAnswerInput);
  }

  @Mutation((returns) => CreateLinearAnswerOutput)
  createLinearAnswer(
    @Args('input') createLinearAnswerInput: CreateLinearAnswerInput,
  ): Promise<CreateLinearAnswerOutput> {
    return this.answersService.createLinearAnswer(createLinearAnswerInput);
  }

  @Mutation((returns) => CreateOpenedAnswerOutput)
  createOpenedAnswer(
    @Args('input') createOpenedAnswerInput: CreateOpenedAnswerInput,
  ): Promise<CreateOpenedAnswerOutput> {
    return this.answersService.createOpenedAnswer(createOpenedAnswerInput);
  }
}
