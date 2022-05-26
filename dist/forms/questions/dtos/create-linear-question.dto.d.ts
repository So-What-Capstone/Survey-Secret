import { LinearQuestion } from '../schemas/linear-question.schema';
import { CoreOutput } from '../../../common/dtos/output.dto';
import { CommonCreateQuestionInput } from './common-create-question.dto';
declare const CreateLinearQuestionInputType_base: import("@nestjs/common").Type<CommonCreateQuestionInput & Pick<LinearQuestion, keyof LinearQuestion>>;
export declare class CreateLinearQuestionInputType extends CreateLinearQuestionInputType_base {
}
export declare class CreateLinearQuestionInput {
    question: CreateLinearQuestionInputType;
    type: string;
}
export declare class CreateLinearQuestionOutput extends CoreOutput {
}
export {};
