import { OpenedAnswer } from '../../schemas/opened-answer.schema';
import { CoreOutput } from '../../../../common/dtos/output.dto';
import { CommonCreateAnswerInput } from '../common-create-answer.dto';
declare const CreateOpenedAnswerInputType_base: import("@nestjs/common").Type<Pick<OpenedAnswer, keyof OpenedAnswer> & CommonCreateAnswerInput>;
export declare class CreateOpenedAnswerInputType extends CreateOpenedAnswerInputType_base {
}
export declare class CreateOpenedAnswerInput {
    answer: CreateOpenedAnswerInputType;
    type: string;
}
export declare class CreateOpenedAnswerOutput extends CoreOutput {
}
export {};
