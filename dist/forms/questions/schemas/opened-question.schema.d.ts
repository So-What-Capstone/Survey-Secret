/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose" />
import { Question } from './question.schema';
export declare enum OpenedQuestionType {
    Default = "Default",
    Date = "Date",
    Time = "Time",
    Address = "Address",
    File = "File"
}
export declare type OpenedQuestionDocument = OpenedQuestion & Document;
export declare class OpenedQuestion extends Question {
    type?: OpenedQuestionType;
}
export declare const OpenedQuestionSchema: import("mongoose").Schema<import("mongoose").Document<OpenedQuestion, any, any>, import("mongoose").Model<import("mongoose").Document<OpenedQuestion, any, any>, any, any, any>, {}, {}>;
