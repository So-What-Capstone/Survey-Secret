import { CreateFormOutput, CreateFormInput } from './dtos/craete-form.dto';
import { FindSectionByIdInput, FindSectionByIdOutput } from './dtos/find-section-by-id';
import { FormsService } from './forms.service';
import { User } from './../users/schemas/user.schema';
export declare class FormsResolver {
    private readonly formsService;
    constructor(formsService: FormsService);
    createForm(user: User, createFormInput: CreateFormInput): Promise<CreateFormOutput>;
    findSectionById({ sectionId }: FindSectionByIdInput): Promise<FindSectionByIdOutput>;
}
