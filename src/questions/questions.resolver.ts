import { Args, Mutation, Resolver } from '@nestjs/graphql';
import {
  CreateClosedQuestionInput,
  CreateClosedQuestionOutput,
} from './dtos/create-closed-question.dto';
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
}
