import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { User } from '../schemas/user.schema';
import { CoreOutput } from '../../common/dtos/output.dto';

@InputType()
export class FindUserByIdInput {
  @Field((type) => String)
  id: string;
}

@ObjectType()
export class FindUserByIdOutput extends CoreOutput {
  @Field((type) => User, { nullable: true })
  user?: User;
}
