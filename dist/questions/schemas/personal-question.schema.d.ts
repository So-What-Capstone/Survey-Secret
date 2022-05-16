/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose" />
import { Question } from './question.schema';
export declare enum PersonalQuestionType {
    Phone = "Phone",
    Address = "Address",
    Email = "Email"
}
export declare type PersonalQuestionDocument = PersonalQuestion & Document;
export declare class PersonalQuestion extends Question {
    encoded: boolean;
    type?: PersonalQuestionType;
}
export declare const PersonalQuestionSchema: import("mongoose").Schema<import("mongoose").Document<PersonalQuestion, any, any>, import("mongoose").Model<import("mongoose").Document<PersonalQuestion, any, any>, any, any, any>, {}, {}>;
