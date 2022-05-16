import { PersonalQuestion } from '../schemas/personal-question.schema';
import { CoreOutput } from '../../common/dtos/output.dto';
declare const CreatePersonalQuestionInput_base: import("@nestjs/common").Type<Pick<PersonalQuestion, "type" | "required" | "description" | "content" | "order" | "encoded">>;
export declare class CreatePersonalQuestionInput extends CreatePersonalQuestionInput_base {
}
export declare class CreatePersonalQuestionOutput extends CoreOutput {
}
export {};
