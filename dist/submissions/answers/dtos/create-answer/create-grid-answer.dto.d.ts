import { GridAnswer } from '../../schemas/grid-answer.schema';
import { CoreOutput } from '../../../../common/dtos/output.dto';
import { CommonCreateAnswerInput } from '../common-create-answer.dto';
declare const CreateGridAnswerInputType_base: import("@nestjs/common").Type<Pick<GridAnswer, keyof GridAnswer> & CommonCreateAnswerInput>;
export declare class CreateGridAnswerInputType extends CreateGridAnswerInputType_base {
}
export declare class CreateGridAnswerInput {
    answer: CreateGridAnswerInputType;
    type: string;
}
export declare class CreateLinearAnswerOutput extends CoreOutput {
}
export {};
