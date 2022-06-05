import { Field, ObjectType, InputType } from '@nestjs/graphql';

export interface MailsModuleOptions {
  apiKey: string;
  domain: string;
  fromEmail: string;
}

@InputType('EmailVarInput', { isAbstract: true })
export class EmailVar {
  @Field((type) => String)
  key: string;

  @Field((type) => String)
  value: string;
}
