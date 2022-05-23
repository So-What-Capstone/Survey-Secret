import { CreateGridQuestionInput } from '../questions/dtos/create-grid-question.dto';
import { CreateLinearQuestionInput } from '../questions/dtos/create-linear-question.dto';
import { CreatePersonalQuestionInput } from '../questions/dtos/create-personal-question.dto';
import { CreateClosedQuestionInput } from '../questions/dtos/create-closed-question.dto';
import { CreateOpenedQuestionInput } from '../questions/dtos/create-opened-question.dto';
import { Section } from '../schemas/section.schema';
import { CoreOutput } from './../../common/dtos/output.dto';
declare const CreateSectionInput_base: import("@nestjs/common").Type<Pick<Section, "title">>;
export declare class CreateSectionInput extends CreateSectionInput_base {
    opened?: CreateOpenedQuestionInput[];
    closed?: CreateClosedQuestionInput[];
    grid?: CreateGridQuestionInput[];
    personal?: CreatePersonalQuestionInput[];
    linear?: CreateLinearQuestionInput[];
}
export declare class CreateSectionOutput extends CoreOutput {
}
export {};
