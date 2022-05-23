import { CreateAccountOutput, CreateAccountInput } from './dtos/create-account.dto';
import { UsersService } from './users.service';
import { FindUserByIdInput, FindUserByIdOutput } from './dtos/find-user-by-id.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
export declare class UsersResolver {
    private readonly usersService;
    constructor(usersService: UsersService);
    test(): boolean;
    createAccount(createAccountInput: CreateAccountInput): Promise<CreateAccountOutput>;
    login(loginInput: LoginInput): Promise<LoginOutput>;
    findUserById({ id }: FindUserByIdInput): Promise<FindUserByIdOutput>;
}
