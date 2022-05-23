import { UserType } from 'src/users/schemas/user.schema';
export declare type AllowedTypes = keyof typeof UserType | 'Any';
export declare const Type: (types: AllowedTypes[]) => import("@nestjs/common").CustomDecorator<string>;
