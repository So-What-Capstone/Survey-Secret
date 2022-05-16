import { ClosedQuestion } from '../schemas/closed-question.schema';
import { CoreOutput } from '../../../common/dtos/output.dto';
import { CommonCreateQuestionInput } from './common-create-question.dto';
declare const CreateClosedQuestionInputType_base: import("@nestjs/common").Type<Pick<ClosedQuestion, keyof ClosedQuestion> & CommonCreateQuestionInput>;
export declare class CreateClosedQuestionInputType extends CreateClosedQuestionInputType_base {
}
export declare class CreateClosedQuestionInput {
    question: CreateClosedQuestionInputType;
    type: string;
}
export declare class CreateClosedQuestionOutput extends CoreOutput {
}
export {};
