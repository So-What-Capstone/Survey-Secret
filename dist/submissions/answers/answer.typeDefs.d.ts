import { ClosedAnswer } from './schemas/closed-answer.schema';
import { GridAnswer } from './schemas/grid-answer.schema';
import { LinearAnswer } from './schemas/linear-answer.schema';
import { PersonalAnswer } from './schemas/personal-answer.schema';
export declare const AnswerUnion: ClosedAnswer | PersonalAnswer | LinearAnswer | GridAnswer;
export declare class AnswerUnionType {
    answer: typeof AnswerUnion;
    type: string;
}
