import { User } from '../schemas/user.schema';
import { CoreOutput } from '../../common/dtos/output.dto';
export declare class FindUserByIdInput {
    id: string;
}
export declare class FindUserByIdOutput extends CoreOutput {
    user?: User;
}
