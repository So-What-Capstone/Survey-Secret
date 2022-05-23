import mongoose from 'mongoose';
import { Answer } from './answer.schema';
export declare type LinearAnswerDocument = LinearAnswer & Document;
export declare class LinearAnswer extends Answer {
    no: number;
}
export declare const LinearAnswerSchema: mongoose.Schema<mongoose.Document<LinearAnswer, any, any>, mongoose.Model<mongoose.Document<LinearAnswer, any, any>, any, any, any>, {}, {}>;
