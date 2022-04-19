import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AnswersService } from './answers.service';

@Resolver()
export class AnswersResolver {
  constructor(private readonly answersService: AnswersService) {}
}
