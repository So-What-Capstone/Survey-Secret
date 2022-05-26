import mongoose from 'mongoose';
import { User } from '../../users/schemas/user.schema';
import { CoreSchema } from './../../common/schemas/core.schema';
export declare enum UsedForType {
    Email = "Email",
    Phone = "Phone"
}
export declare type CoinConsumptionDocument = CoinConsumption & Document;
export declare class CoinConsumption extends CoreSchema {
    consumedAt: Date;
    usedForType: UsedForType;
    coinAmount: number;
    cashAmount: number;
    owner: User;
}
export declare const CoinChargeSchema: mongoose.Schema<mongoose.Document<CoinConsumption, any, any>, mongoose.Model<mongoose.Document<CoinConsumption, any, any>, any, any, any>, {}, {}>;
