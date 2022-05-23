import mongoose from 'mongoose';
import { User } from './user.schema';
import { CoreSchema } from './../../common/schemas/core.schema';
export declare type VerificationDocument = Verification & Document;
export declare class Verification extends CoreSchema {
    code: string;
    user: User;
}
export declare const VerificationSchema: mongoose.Schema<mongoose.Document<Verification, any, any>, mongoose.Model<mongoose.Document<Verification, any, any>, any, any, any>, {}, {}>;
