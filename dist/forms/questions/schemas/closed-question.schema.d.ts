import { Question } from './question.schema';
import mongoose from 'mongoose';
export declare enum ClosedQuestionType {
    One = "One",
    Multiple = "Multiple"
}
export declare type ClosedQuestionDocument = ClosedQuestion & Document;
export declare class ClosedQuestionChoice {
    no: number;
    choice: string;
}
export declare class ClosedQuestion extends Question {
    choices: ClosedQuestionChoice[];
    type?: ClosedQuestionType;
}
export declare const ClosedQuestionSchema: mongoose.Schema<mongoose.Document<ClosedQuestion, any, any>, mongoose.Model<mongoose.Document<ClosedQuestion, any, any>, any, any, any>, {}, {}>;
