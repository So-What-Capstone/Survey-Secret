import { Answer } from './answer.schema';
import mongoose from 'mongoose';
export declare type OpenedAnswerDocument = OpenedAnswer & Document;
export declare class OpenedAnswer extends Answer {
    content?: string;
}
export declare const OpenedAnswerSchema: mongoose.Schema<mongoose.Document<OpenedAnswer, any, any>, mongoose.Model<mongoose.Document<OpenedAnswer, any, any>, any, any, any>, {}, {}>;
