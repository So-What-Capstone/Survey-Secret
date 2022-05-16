import { LinearAnswer } from '../../schemas/linear-answer.schema';
import { CoreOutput } from '../../../../common/dtos/output.dto';
import { CommonCreateAnswerInput } from '../common-create-answer.dto';
declare const CreateLinearAnswerInputType_base: import("@nestjs/common").Type<Pick<LinearAnswer, keyof LinearAnswer> & CommonCreateAnswerInput>;
export declare class CreateLinearAnswerInputType extends CreateLinearAnswerInputType_base {
}
export declare class CreateLinearAnswerInput {
    answer: CreateLinearAnswerInputType;
    type: string;
}
export declare class CreateLinearAnswerOutput extends CoreOutput {
}
export {};
