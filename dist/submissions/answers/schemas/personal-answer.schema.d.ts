/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose" />
import { Answer } from './answer.schema';
export declare class PersonalAnswer extends Answer {
    content?: string;
}
export declare const PersonalAnswerSchema: import("mongoose").Schema<import("mongoose").Document<PersonalAnswer, any, any>, import("mongoose").Model<import("mongoose").Document<PersonalAnswer, any, any>, any, any, any>, {}, {}>;
