import { ClosedQuestion } from '../schemas/closed-question.schema';
import { CoreOutput } from './../../common/dtos/output.dto';
declare const CreateClosedQuestionInput_base: import("@nestjs/common").Type<Pick<ClosedQuestion, "type" | "required" | "description" | "content" | "choices" | "order">>;
export declare class CreateClosedQuestionInput extends CreateClosedQuestionInput_base {
}
export declare class CreateClosedQuestionOutput extends CoreOutput {
}
export {};
