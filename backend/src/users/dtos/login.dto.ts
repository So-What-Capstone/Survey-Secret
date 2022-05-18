import { Field, InputType, PickType, ObjectType } from '@nestjs/graphql';
import { User } from '../schemas/user.schema';
import { CoreOutput } from './../../common/dtos/output.dto';

@InputType()
export class LoginInput extends PickType(User, ['email', 'password']) {}

@ObjectType()
export class LoginOutput extends CoreOutput {
  @Field((type) => String, { nullable: true })
  token?: string;
}
