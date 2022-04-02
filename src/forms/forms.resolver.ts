import { Resolver, Mutation, Args } from '@nestjs/graphql';
import { CreateFormOutput, CreateFormInput } from './dtos/craete-form.dto';
import { FormsService } from './forms.service';

@Resolver()
export class FormsResolver {
  constructor(private readonly formsService: FormsService) {}

  @Mutation((returns) => CreateFormOutput)
  createForm(
    @Args('input') createFormInput: CreateFormInput,
  ): Promise<CreateFormOutput> {
    return this.formsService.createForm(createFormInput);
  }
}
