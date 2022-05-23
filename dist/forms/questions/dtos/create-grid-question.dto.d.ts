import { CoreOutput } from '../../../common/dtos/output.dto';
import { GridQuestion } from '../schemas/grid-question.scheam';
import { CommonCreateQuestionInput } from './common-create-question.dto';
declare const CreateGridQuestionInputType_base: import("@nestjs/common").Type<CommonCreateQuestionInput & Pick<GridQuestion, keyof GridQuestion>>;
export declare class CreateGridQuestionInputType extends CreateGridQuestionInputType_base {
}
export declare class CreateGridQuestionInput {
    question: CreateGridQuestionInputType;
    type: string;
}
export declare class CreateGridQuestionOutput extends CoreOutput {
}
export {};
