import { User } from '../schemas/user.schema';
import { CoreOutput } from './../../common/dtos/output.dto';
declare const CreateAccountInput_base: import("@nestjs/common").Type<Pick<User, "username" | "phoneNum" | "email" | "password">>;
export declare class CreateAccountInput extends CreateAccountInput_base {
}
export declare class CreateAccountOutput extends CoreOutput {
}
export {};
