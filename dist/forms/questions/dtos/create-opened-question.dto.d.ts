import { CoreOutput } from '../../../common/dtos/output.dto';
import { OpenedQuestion } from '../schemas/opened-question.schema';
import { CommonCreateQuestionInput } from './common-create-question.dto';
declare const CreateOpenedQuestionInputType_base: import("@nestjs/common").Type<CommonCreateQuestionInput & Pick<OpenedQuestion, keyof OpenedQuestion>>;
export declare class CreateOpenedQuestionInputType extends CreateOpenedQuestionInputType_base {
}
export declare class CreateOpenedQuestionInput {
    question: CreateOpenedQuestionInputType;
    type: string;
}
export declare class CreateOpenedQuestionOutput extends CoreOutput {
}
export {};
