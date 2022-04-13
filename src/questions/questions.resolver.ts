import { Mutation, Resolver } from '@nestjs/graphql';
import { QuestionsService } from './questions.service';

@Resolver()
export class QuestionsResolver {
  constructor(private readonly questionsService: QuestionsService) {}
}
