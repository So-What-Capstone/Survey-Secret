import { UserDocument } from '../users/schemas/user.schema';
import { Model } from 'mongoose';
import { CreateAccountOutput, CreateAccountInput } from './dtos/create-account.dto';
import { FindUserByIdOutput } from './dtos/find-user-by-id.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import { MailsService } from './../mails/mails.service';
import { VerificationDocument } from './schemas/verification.schema';
export declare class UsersService {
    private readonly userModel;
    private readonly mailsService;
    private readonly verificationModel;
    constructor(userModel: Model<UserDocument>, mailsService: MailsService, verificationModel: Model<VerificationDocument>);
    createAccount({ username, email, password, phoneNum, }: CreateAccountInput): Promise<CreateAccountOutput>;
    login({ email, password }: LoginInput): Promise<LoginOutput>;
    findById(id: string): Promise<FindUserByIdOutput>;
}
