import { Resolver, Mutation, Args, Query } from '@nestjs/graphql';
import { AuthUser } from '../auth/auth-user.decorator';
import { Type } from '../auth/type.decorator';
import { CreateFormOutput, CreateFormInput } from './dtos/create-form.dto';
import {
  FindSectionByIdInput,
  FindSectionByIdOutput,
} from './dtos/find-section-by-id.dto';
import { FormsService } from './forms.service';
import { User } from './../users/schemas/user.schema';
import {
  FindFormByIdInput,
  FindFormByIdOutput,
} from './dtos/find-form-by-id.dto';
import { DeleteFormOutput, DeleteFormInput } from './dtos/delete-form.dto';
import { EditFormInput, EditFormOutput } from './dtos/edit-form.dto';
import { SearchFormsInput, SearchFormsOutput } from './dtos/search-forms.dto';
import { GetFormsInput, GetFormsOutput } from './dtos/get-forms.dto';
import { GetTemplatesOutput } from './dtos/get-templates.dto';
import {
  FindTemplateByIdInput,
  FindTemplateByIdOutput,
} from './dtos/find-template-by-id.dto';
import {
  FindQuestionByIdInput,
  FindQuestionByIdOutput,
} from './dtos/find-question-by-id.dto';

@Resolver()
export class FormsResolver {
  constructor(private readonly formsService: FormsService) {}

  @Mutation((returns) => CreateFormOutput)
  @Type(['Free', 'Premium'])
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

  @Query((returns) => FindFormByIdOutput)
  findFormById(
    @Args('input') findFormByIdInput: FindFormByIdInput,
  ): Promise<FindFormByIdOutput> {
    return this.formsService.findFormById(findFormByIdInput.formId);
  }

  @Query((returns) => FindFormByIdOutput)
  @Type(['Free', 'Premium'])
  findFormByIdForOwner(
    @Args('input') findFormByIdInput: FindFormByIdInput,
    @AuthUser() owner: User,
  ): Promise<FindFormByIdOutput> {
    return this.formsService.findFormByIdForOwner(
      findFormByIdInput.formId,
      owner,
    );
  }

  @Mutation((returns) => DeleteFormOutput)
  @Type(['Free', 'Premium'])
  deleteForm(
    @AuthUser() owner: User,
    @Args('input') deleteFormInput: DeleteFormInput,
  ): Promise<DeleteFormOutput> {
    return this.formsService.deleteForm(owner, deleteFormInput.formId);
  }

  @Mutation((returns) => EditFormOutput)
  @Type(['Free', 'Premium'])
  editForm(
    @AuthUser() owner: User,
    @Args('input') editFormInput: EditFormInput,
  ): Promise<EditFormOutput> {
    return this.formsService.editForm(owner, editFormInput);
  }

  @Query((returns) => SearchFormsOutput)
  searchForms(
    @Args('input') searchFormsInput: SearchFormsInput,
  ): Promise<SearchFormsOutput> {
    return this.formsService.searchForms(searchFormsInput);
  }

  @Query((returns) => GetFormsOutput)
  getForms(
    @Args('input') getFormsInput: GetFormsInput,
  ): Promise<GetFormsOutput> {
    return this.formsService.getForms(getFormsInput);
  }

  @Query((returns) => GetTemplatesOutput)
  @Type(['Any'])
  getTemplates(): Promise<GetTemplatesOutput> {
    return this.formsService.getTemplates();
  }

  @Query((returns) => FindTemplateByIdOutput)
  @Type(['Any'])
  findTemplateById(@Args('input') { templateId }: FindTemplateByIdInput) {
    return this.formsService.findTemplateById(templateId);
  }

  @Query((returns) => FindQuestionByIdOutput)
  findQuestionById(
    @Args('input') findQuestionByIdInput: FindQuestionByIdInput,
  ) {
    return this.formsService.findQuestionById(findQuestionByIdInput);
  }
}
