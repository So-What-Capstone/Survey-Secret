import { SetMetadata } from '@nestjs/common';
import { UserType } from 'src/users/schemas/user.schema';

export type AllowedTypes = keyof typeof UserType | 'Any' | 'NotLoggedIn';

export const Type = (types: AllowedTypes[]) => {
  return SetMetadata('types', types);
};
