import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { Type } from '../auth/type.decorator';
import { CreateFormOutput, CreateFormInput } from './dtos/craete-form.dto';
import {
  CreateSectionOutput,
  CreateSectionInput,
} from './dtos/create-section.dto';
import { FormsService } from './forms.service';

@Resolver()
export class FormsResolver {
  constructor(private readonly formsService: FormsService) {}

  @Mutation((returns) => CreateFormOutput)
  @Type(['Free'])
  createForm(
    @Args('input') createFormInput: CreateFormInput,
  ): Promise<CreateFormOutput> {
    return this.formsService.createForm(createFormInput);
  }

  @Mutation((returns) => CreateSectionOutput)
  createSection(
    @Args('input') createSectionInput: CreateSectionInput,
  ): Promise<CreateSectionOutput> {
    return this.formsService.createSection(createSectionInput);
  }
}
