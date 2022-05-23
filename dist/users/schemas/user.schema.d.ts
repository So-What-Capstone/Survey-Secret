import mongoose from 'mongoose';
import { Form } from '../../forms/schemas/form.schema';
import { CoreSchema } from './../../common/schemas/core.schema';
export declare enum UserType {
    Free = "Free",
    Premium = "Premium",
    Admin = "Admin"
}
export declare type UserDocument = User & Document;
export declare class User extends CoreSchema {
    _id: mongoose.Schema.Types.ObjectId;
    username: string;
    phoneNum?: string;
    email: string;
    password: string;
    type: UserType;
    coin?: number;
    avatarImg?: string;
    forms?: Form[];
    isVerified?: boolean;
}
export declare const UserSchema: mongoose.Schema<mongoose.Document<User, any, any>, mongoose.Model<mongoose.Document<User, any, any>, any, any, any>, {}, {}>;
