import { Answer } from './answer.schema';
export declare class GridAnswerContent {
    rowNo: number;
    colNo: number;
}
export declare class GridAnswer extends Answer {
    content: GridAnswerContent[];
}
