import { CoreOutput } from './../../common/dtos/output.dto';
import { OpenedQuestion } from './../schemas/opened-question.schema';
declare const CreateOpenedQuestionInput_base: import("@nestjs/common").Type<Pick<OpenedQuestion, "type" | "required" | "description" | "content" | "order">>;
export declare class CreateOpenedQuestionInput extends CreateOpenedQuestionInput_base {
}
export declare class CreateOpenedQuestionOutput extends CoreOutput {
}
export {};
