import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AnswersService } from './answers.service';

@Resolver()
export class AnswersResolver {
  constructor(private readonly answersService: AnswersService) {}

  // @Mutation((returns) => CreateClosedAnswerOutput)
  // createClosedAnswer(
  //   @Args('input') createClosedAnswerInput: CreateClosedAnswerInput,
  // ): Promise<CreateClosedAnswerOutput> {
  //   return this.answersService.createClosedAnswer(createClosedAnswerInput);
  // }

  // @Mutation((returns) => CreateLinearAnswerOutput)
  // createLinearAnswer(
  //   @Args('input') createLinearAnswerInput: CreateLinearAnswerInput,
  // ): Promise<CreateLinearAnswerOutput> {
  //   return this.answersService.createLinearAnswer(createLinearAnswerInput);
  // }

  // @Mutation((returns) => CreateOpenedAnswerOutput)
  // createOpenedAnswer(
  //   @Args('input') createOpenedAnswerInput: CreateOpenedAnswerInput,
  // ): Promise<CreateOpenedAnswerOutput> {
  //   return this.answersService.createOpenedAnswer(createOpenedAnswerInput);
  // }
}
