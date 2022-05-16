import { CoreOutput } from './../../common/dtos/output.dto';
import { GridQuestion } from './../schemas/grid-question.scheam';
declare const CreateGridQuestionInput_base: import("@nestjs/common").Type<Pick<GridQuestion, "type" | "required" | "description" | "content" | "order" | "rowContent" | "colContent">>;
export declare class CreateGridQuestionInput extends CreateGridQuestionInput_base {
}
export declare class CreateGridQuestionOutput extends CoreOutput {
}
export {};
