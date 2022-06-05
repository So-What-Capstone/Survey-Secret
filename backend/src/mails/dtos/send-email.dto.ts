import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { EmailVar } from '../mails.interfaces';
import { CoreOutput } from './../../common/dtos/output.dto';

@InputType()
export class SendEmailInput {
  @Field((type) => String)
  subject: string;

  @Field((type) => String)
  to: string;

  @Field((type) => String, { nullable: true })
  template?: string;

  @Field((type) => [EmailVar])
  emailVars: EmailVar[];
}

@ObjectType()
export class SendEmailOutput extends CoreOutput {}
