import { User } from '../schemas/user.schema';
import { CoreOutput } from './../../common/dtos/output.dto';
declare const LoginInput_base: import("@nestjs/common").Type<Pick<User, "email" | "password">>;
export declare class LoginInput extends LoginInput_base {
}
export declare class LoginOutput extends CoreOutput {
    token?: string;
}
export {};
