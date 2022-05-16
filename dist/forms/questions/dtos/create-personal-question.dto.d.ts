import { PersonalQuestion } from '../schemas/personal-question.schema';
import { CoreOutput } from '../../../common/dtos/output.dto';
import { CommonCreateQuestionInput } from './common-create-question.dto';
declare const CreatePersonalQuestionInputType_base: import("@nestjs/common").Type<CommonCreateQuestionInput & Pick<PersonalQuestion, keyof PersonalQuestion>>;
export declare class CreatePersonalQuestionInputType extends CreatePersonalQuestionInputType_base {
}
export declare class CreatePersonalQuestionInput {
    question: CreatePersonalQuestionInputType;
    type: string;
}
export declare class CreatePersonalQuestionOutput extends CoreOutput {
}
export {};
