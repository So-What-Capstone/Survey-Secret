import { InputType, ObjectType, PartialType, PickType } from '@nestjs/graphql';
import { CoreOutput } from './../../common/dtos/output.dto';
import { User } from '../schemas/user.schema';

@InputType()
export class EditUserInput extends PartialType(
  PickType(User, ['password', 'username']),
) {}

@ObjectType()
export class EditUserOutput extends CoreOutput {}