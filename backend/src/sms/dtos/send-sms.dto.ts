import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from './../../common/dtos/output.dto';

@InputType()
export class SendSmsInput {
  @Field((type) => String)
  sender: string;

  @Field((type) => String)
  receiver: string;

  @Field((type) => String)
  msg: string;
}

@ObjectType()
export class SendSmsOutput extends CoreOutput {}
