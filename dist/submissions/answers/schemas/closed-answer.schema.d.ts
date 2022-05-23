import mongoose from 'mongoose';
import { Answer } from './answer.schema';
export declare type ClosedAnswerDocument = ClosedAnswer & Document;
export declare class ClosedAnswer extends Answer {
    no: number[];
}
export declare const ClosedAnswerSchema: mongoose.Schema<mongoose.Document<ClosedAnswer, any, any>, mongoose.Model<mongoose.Document<ClosedAnswer, any, any>, any, any, any>, {}, {}>;
