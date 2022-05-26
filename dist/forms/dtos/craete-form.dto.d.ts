import { Form } from '../schemas/form.schema';
import { CoreOutput } from './../../common/dtos/output.dto';
import { CreateSectionInput } from './create-section.dto';
declare const CreateFormInput_base: import("@nestjs/common").Type<Pick<Form, "description" | "title">>;
export declare class CreateFormInput extends CreateFormInput_base {
    sections?: CreateSectionInput[];
}
export declare class CreateFormOutput extends CoreOutput {
}
export {};
