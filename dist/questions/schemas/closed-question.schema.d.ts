/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose" />
import { Question } from './question.schema';
export declare enum ClosedQuestionType {
    One = "One",
    Multiple = "Multiple"
}
export declare type ClosedQuestionDocument = ClosedQuestion & Document;
export declare class ClosedQuestionChoiceType {
    no: number;
    choice: string;
}
export declare class ClosedQuestion extends Question {
    choices: ClosedQuestionChoiceType[];
    type?: ClosedQuestionType;
}
export declare const ClosedQuestionSchema: import("mongoose").Schema<import("mongoose").Document<ClosedQuestion, any, any>, import("mongoose").Model<import("mongoose").Document<ClosedQuestion, any, any>, any, any, any>, {}, {}>;
