import { Question } from '../schemas/question.schema';
declare const CommonCreateQuestionInput_base: import("@nestjs/common").Type<Pick<Question, "required" | "description" | "content" | "order">>;
export declare class CommonCreateQuestionInput extends CommonCreateQuestionInput_base {
}
export {};
