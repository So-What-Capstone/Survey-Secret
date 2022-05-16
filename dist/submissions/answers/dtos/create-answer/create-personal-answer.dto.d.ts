import { CommonCreateAnswerInput } from '../common-create-answer.dto';
import { PersonalAnswer } from '../../schemas/personal-answer.schema';
declare const CreatePersonalAnswerInputType_base: import("@nestjs/common").Type<CommonCreateAnswerInput & Pick<PersonalAnswer, keyof PersonalAnswer>>;
export declare class CreatePersonalAnswerInputType extends CreatePersonalAnswerInputType_base {
}
export declare class CreatePersonalAnswerInput {
    answer: CreatePersonalAnswerInputType;
    type: string;
}
export {};
