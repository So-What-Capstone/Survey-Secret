import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AuthUser } from '../auth/auth-user.decorator';
import { Type } from '../auth/type.decorator';
import { CreateFormOutput, CreateFormInput } from './dtos/craete-form.dto';
import {
  FindSectionByIdInput,
  FindSectionByIdOutput,
} from './dtos/find-section-by-id.dto';
import { FormsService } from './forms.service';
import { User } from './../users/schemas/user.schema';
import {
  FindFormByIdInput,
  FIndFormByIdOutput,
} from './dtos/find-form-by-id.dto';
import { DeleteFormOutput, DeleteFormInput } from './dtos/delete-form.dto';

@Resolver()
export class FormsResolver {
  constructor(private readonly formsService: FormsService) {}

  @Mutation((returns) => CreateFormOutput)
  @Type(['Free'])
  createForm(
    @AuthUser() user: User,
    @Args('input') createFormInput: CreateFormInput,
  ): Promise<CreateFormOutput> {
    return this.formsService.createForm(user, createFormInput);
  }

  @Query((returns) => FindSectionByIdOutput)
  findSectionById(
    @Args('input') { sectionId }: FindSectionByIdInput,
  ): Promise<FindSectionByIdOutput> {
    return this.formsService.findSectionById(sectionId);
  }

  @Query((returns) => FIndFormByIdOutput)
  findFormById(
    @Args('input') findFormByIdInput: FindFormByIdInput,
  ): Promise<FIndFormByIdOutput> {
    return this.formsService.findFormById(findFormByIdInput.formId);
  }

  @Mutation((returns) => DeleteFormOutput)
  @Type(['Any'])
  deleteForm(
    @AuthUser() owner: User,
    @Args('input') deleteFormInput: DeleteFormInput,
  ): Promise<DeleteFormOutput> {
    return this.formsService.deleteForm(owner, deleteFormInput.formId);
  }
}
