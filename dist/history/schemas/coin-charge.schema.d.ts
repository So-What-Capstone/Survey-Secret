import mongoose from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { CoreSchema } from './../../common/schemas/core.schema';
export declare enum PaymentType {
    Card = "Card",
    Transfer = "Transfer",
    Event = "Event"
}
export declare type CoinChargeDocument = CoinCharge & Document;
export declare class CoinCharge extends CoreSchema {
    chargedAt: Date;
    paymentType: PaymentType;
    coinAmount: number;
    cashAmount: number;
    owner: User;
}
export declare const CoinChargeSchema: mongoose.Schema<mongoose.Document<CoinCharge, any, any>, mongoose.Model<mongoose.Document<CoinCharge, any, any>, any, any, any>, {}, {}>;
