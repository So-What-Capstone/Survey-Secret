import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { SendSmsInput } from 'src/sms/dtos/send-sms.dto';
import { EmailVar } from '../mails.interfaces';
import { CoreOutput } from './../../common/dtos/output.dto';

@InputType()
export class SendEmailInput extends PickType(SendSmsInput, [
  'formId',
  'submissionIds',
  'questionId',
]) {
  @Field((type) => String)
  subject: string;

  @Field((type) => String, { nullable: true })
  template?: string;

  @Field((type) => [EmailVar])
  emailVars: EmailVar[];
}

@ObjectType()
export class SendEmailOutput extends CoreOutput {}
