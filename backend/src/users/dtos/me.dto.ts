import { Field, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from './../../common/dtos/output.dto';
import { User } from './../schemas/user.schema';

@ObjectType()
export class meOutput extends CoreOutput {
  @Field((type) => User, { nullable: true })
  user?: User;
}
