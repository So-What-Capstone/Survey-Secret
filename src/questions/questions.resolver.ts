import { Args, Mutation, Resolver } from '@nestjs/graphql';
import {
  CreateClosedQuestionInput,
  CreateClosedQuestionOutput,
} from './dtos/create-closed-question.dto';
import {
  CreateGridQuestionInput,
  CreateGridQuestionOutput,
} from './dtos/create-grid-question.dto';
import {
  CreateLinearQuestionInput,
  CreateLinearQuestionOutput,
} from './dtos/create-linear-question.dto';
import {
  CreateOpenedQuestionInput,
  CreateOpenedQuestionOutput,
} from './dtos/create-opened-question.dto';
import {
  CreatePersonalQuestionOutput,
  CreatePersonalQuestionInput,
} from './dtos/create-personal-question.dto';
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

  @Mutation((returns) => CreateGridQuestionOutput)
  createGridQuestion(
    @Args('input') createGridQuestionInput: CreateGridQuestionInput,
  ): Promise<CreateGridQuestionOutput> {
    return this.questionsService.createGridQuestion(createGridQuestionInput);
  }

  @Mutation((returns) => CreatePersonalQuestionOutput)
  createPersonalQuestion(
    @Args('input') createPersonalQuestionInput: CreatePersonalQuestionInput,
  ): Promise<CreatePersonalQuestionOutput> {
    return this.questionsService.createPersonalQuestion(
      createPersonalQuestionInput,
    );
  }
}
