import { Mutation, Resolver, Args } from '@nestjs/graphql';
import {
  CreateSubmissionOutput,
  CreateSubmissionInput,
} from './dtos/create-submission.dto';
import { SubmissionsService } from './submissions.service';

@Resolver()
export class SubmissionsResolver {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Mutation((returns) => CreateSubmissionOutput)
  createSubmission(
    @Args('input') createSubmissionInput: CreateSubmissionInput,
  ): Promise<CreateSubmissionOutput> {
    return this.submissionsService.createSubmission(createSubmissionInput);
  }
}
