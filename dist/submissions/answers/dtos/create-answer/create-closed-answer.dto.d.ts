import { ClosedAnswer } from '../../schemas/closed-answer.schema';
import { CoreOutput } from '../../../../common/dtos/output.dto';
import { CommonCreateAnswerInput } from '../common-create-answer.dto';
declare const CreateClosedAnswerInputType_base: import("@nestjs/common").Type<Pick<ClosedAnswer, keyof ClosedAnswer> & CommonCreateAnswerInput>;
export declare class CreateClosedAnswerInputType extends CreateClosedAnswerInputType_base {
}
export declare class CreateClosedAnswerInput {
    answer: CreateClosedAnswerInputType;
    type: string;
}
export declare class CreateClosedAnswerOutput extends CoreOutput {
}
export {};
