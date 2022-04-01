import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { User } from '../schemas/user.schema';
import { CoreOutput } from './../../common/dtos/output.dto';

@InputType()
export class CreateAccountInput extends PickType(User, [
  'username',
  'password',
  'email',
  'phoneNum',
]) {}

@ObjectType()
export class CreateAccountOutput extends CoreOutput {}
