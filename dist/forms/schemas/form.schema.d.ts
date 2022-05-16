import { CoreSchema } from './../../common/schemas/core.schema';
import { User } from '../../users/schemas/user.schema';
import mongoose from 'mongoose';
import { Section } from './section.schema';
export declare enum FormState {
    Ready = "Ready",
    Expired = "Expired"
}
export declare type FormDocument = Form & Document;
export declare class Form extends CoreSchema {
    _id: mongoose.Schema.Types.ObjectId;
    title: string;
    description?: string;
    state: string;
    isPromoted: boolean;
    expiredAt?: Date;
    privacyExpiredAt: Date;
    owner: User;
    sections?: Section[];
}
export declare const FormSchema: mongoose.Schema<mongoose.Document<Form, any, any>, mongoose.Model<mongoose.Document<Form, any, any>, any, any, any>, {}, {}>;
