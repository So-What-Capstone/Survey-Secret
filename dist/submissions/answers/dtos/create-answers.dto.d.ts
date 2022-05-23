import { CreateClosedAnswerInput } from './create-answer/create-closed-answer.dto';
import { CreateGridAnswerInput } from './create-answer/create-grid-answer.dto';
import { CreateLinearAnswerInput } from './create-answer/create-linear-answer.dto';
import { CreateOpenedAnswerInput } from './create-answer/create-opened-answer.dto';
import { CreatePersonalAnswerInput } from './create-answer/create-personal-answer.dto';
export declare class CreateAnswersInput {
    opened?: CreateOpenedAnswerInput[];
    closed?: CreateClosedAnswerInput[];
    linear?: CreateLinearAnswerInput[];
    grid?: CreateGridAnswerInput[];
    personal?: CreatePersonalAnswerInput[];
}
