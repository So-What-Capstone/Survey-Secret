/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose" />
import { Question } from './question.schema';
export declare enum GridQuestionType {
    One = "One",
    Multiple = "Multiple"
}
export declare type GridQuestionDocument = GridQuestion & Document;
export declare class GridQuestion extends Question {
    rowContent?: string[];
    colContent?: string[];
    type?: GridQuestionType;
}
export declare const GridQuestionSchema: import("mongoose").Schema<import("mongoose").Document<GridQuestion, any, any>, import("mongoose").Model<import("mongoose").Document<GridQuestion, any, any>, any, any, any>, {}, {}>;
