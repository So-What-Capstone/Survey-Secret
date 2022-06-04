import { Mutation, Resolver, Args, Query } from '@nestjs/graphql';
import { AuthUser } from '../auth/auth-user.decorator';
import { Type } from '../auth/type.decorator';
import {
  CreateSubmissionOutput,
  CreateSubmissionInput,
} from './dtos/create-submission.dto';
import {
  FindSubmissionByIdOutput,
  FindSubmissionByIdInput,
} from './dtos/find-submission-by-id.dto';
import { SubmissionsService } from './submissions.service';
import { User } from './../users/schemas/user.schema';
import {
  DeleteSubmissionInput,
  DeleteSubmissionOutput,
} from './dtos/delete-submission.dto';
import {
  ToggleFavoriteSubmissionInput,
  ToggleFavoriteSubmissionsOutput,
} from './dtos/toggle-favorite-submissions.dto';
import {
  FindAnswerByQuestionIdInput,
  FindAnswerByQuestionIdOutput,
} from './dtos/find-answer-by-question-id-output.dto';

@Resolver()
export class SubmissionsResolver {
  constructor(private readonly submissionsService: SubmissionsService) {}

  @Mutation((returns) => CreateSubmissionOutput)
  @Type(['NotLoggedIn'])
  createSubmission(
    @AuthUser() respondent: User,
    @Args('input') createSubmissionInput: CreateSubmissionInput,
  ): Promise<CreateSubmissionOutput> {
    return this.submissionsService.createSubmission(
      respondent,
      createSubmissionInput,
    );
  }

  @Query((returns) => FindSubmissionByIdOutput)
  @Type(['Any'])
  findSubmissionById(
    @AuthUser() owner: User,
    @Args('input') findSubmissionByIdInput: FindSubmissionByIdInput,
  ): Promise<FindSubmissionByIdOutput> {
    return this.submissionsService.findSubmissionById(
      owner,
      findSubmissionByIdInput.submissionId,
    );
  }

  @Mutation((returns) => DeleteSubmissionOutput)
  @Type(['Any'])
  deleteSubmission(
    @AuthUser() owner: User,
    @Args('input') deleteSubmissionInput: DeleteSubmissionInput,
  ): Promise<DeleteSubmissionOutput> {
    return this.submissionsService.deleteSubmission(
      owner,
      deleteSubmissionInput.submissionId,
    );
  }

  @Mutation((returns) => ToggleFavoriteSubmissionsOutput)
  @Type(['Any'])
  toggleFavoriteSubmissions(
    @AuthUser() owner: User,
    @Args('input') toggleFavoriteSubmissionInput: ToggleFavoriteSubmissionInput,
  ): Promise<ToggleFavoriteSubmissionsOutput> {
    return this.submissionsService.toggleFavoriteSubmission(
      owner,
      toggleFavoriteSubmissionInput,
    );
  }

  @Query((returns) => FindAnswerByQuestionIdOutput)
  @Type(['Any'])
  findAnswerByQuestionId(
    @AuthUser() owner: User,
    @Args('input') findAnswerByQuestionIdInput: FindAnswerByQuestionIdInput,
  ): Promise<FindAnswerByQuestionIdOutput> {
    return this.submissionsService.findAnswerByQuestionId(
      owner,
      findAnswerByQuestionIdInput,
    );
  }
}
