import { Args, Mutation, Resolver } from '@nestjs/graphql';
import {
  CreateClosedQuestionInput,
  CreateClosedQuestionOutput,
} from './dtos/create-closed-question.dto';
import {
  CreateLinearQuestionInput,
  CreateLinearQuestionOutput,
} from './dtos/create-linear-question.dto';
import {
  CreateOpenedQuestionInput,
  CreateOpenedQuestionOutput,
} from './dtos/create-opened-question.dto';
import { QuestionsService } from './questions.service';

@Resolver()
export class QuestionsResolver {
  constructor(private readonly questionsService: QuestionsService) {}

  @Mutation((returns) => CreateClosedQuestionOutput)
  createClosedQuestion(
    @Args('input') createClosedQuestionInput: CreateClosedQuestionInput,
  ): Promise<CreateClosedQuestionOutput> {
    return this.questionsService.createClosedQuestion(
      createClosedQuestionInput,
    );
  }

  @Mutation((returns) => CreateOpenedQuestionOutput)
  createOpenedQuestion(
    @Args('input') createOpenedQuestionInput: CreateOpenedQuestionInput,
  ): Promise<CreateOpenedQuestionOutput> {
    return this.questionsService.createOpenedQuestion(
      createOpenedQuestionInput,
    );
  }

  @Mutation((returns) => CreateLinearQuestionOutput)
  createLinearQuestion(
    @Args('input') createLinearQuestionInput: CreateLinearQuestionInput,
  ): Promise<CreateLinearQuestionOutput> {
    return this.questionsService.createLinearQuestion(
      createLinearQuestionInput,
    );
  }
}
