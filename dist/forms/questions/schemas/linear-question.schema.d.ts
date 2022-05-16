/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose" />
import { Question } from './question.schema';
export declare type LinearQuestionDocument = LinearQuestion & Document;
export declare class LinearQuestion extends Question {
    leftRange: number;
    rightRange: number;
    leftLabel?: string;
    rightLabel?: string;
}
export declare const LinearQuestionSchema: import("mongoose").Schema<import("mongoose").Document<LinearQuestion, any, any>, import("mongoose").Model<import("mongoose").Document<LinearQuestion, any, any>, any, any, any>, {}, {}>;
