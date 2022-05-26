import mongoose from 'mongoose';
import { QuestionUnionType } from '../questions/question.typeDefs';
export declare type SectionDocument = Section & Document;
export declare class Section {
    _id: mongoose.Schema.Types.ObjectId;
    title?: string;
    questions?: QuestionUnionType[];
}
export declare const SectionSchema: mongoose.Schema<mongoose.Document<Section, any, any>, mongoose.Model<mongoose.Document<Section, any, any>, any, any, any>, {}, {}>;
