import { ClosedQuestion } from './schemas/closed-question.schema';
import { GridQuestion } from './schemas/grid-question.scheam';
import { LinearQuestion } from './schemas/linear-question.schema';
import { OpenedQuestion } from './schemas/opened-question.schema';
import { PersonalQuestion } from './schemas/personal-question.schema';
export declare enum QuestionType {
    Closed = "Closed",
    Grid = "Grid",
    Linear = "Linear",
    Opened = "Opened",
    Personal = "Personal"
}
export declare const QuestionUnion: ClosedQuestion | PersonalQuestion | OpenedQuestion | GridQuestion | LinearQuestion;
export declare class QuestionUnionType {
    question: typeof QuestionUnion;
    type: QuestionType;
}
