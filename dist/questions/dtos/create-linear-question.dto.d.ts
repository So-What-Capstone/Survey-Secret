import { LinearQuestion } from '../schemas/linear-question.schema';
import { CoreOutput } from './../../common/dtos/output.dto';
declare const CreateLinearQuestionInput_base: import("@nestjs/common").Type<Pick<LinearQuestion, "required" | "description" | "content" | "order" | "leftLabel" | "rightLabel" | "leftRange" | "rightRange">>;
export declare class CreateLinearQuestionInput extends CreateLinearQuestionInput_base {
}
export declare class CreateLinearQuestionOutput extends CoreOutput {
}
export {};
