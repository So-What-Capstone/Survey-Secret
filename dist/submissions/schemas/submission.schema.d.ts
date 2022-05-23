import { CoreSchema } from './../../common/schemas/core.schema';
import { User } from '../../users/schemas/user.schema';
import mongoose from 'mongoose';
import { Form } from './../../forms/schemas/form.schema';
import { AnswerUnionType } from '../answers/answer.typeDefs';
export declare type SubmissionDocument = Submission & Document;
export declare class Submission extends CoreSchema {
    respondent?: User;
    form: Form;
    answers?: AnswerUnionType[];
}
export declare const SubmissionSchema: mongoose.Schema<mongoose.Document<Submission, any, any>, mongoose.Model<mongoose.Document<Submission, any, any>, any, any, any>, {}, {}>;
