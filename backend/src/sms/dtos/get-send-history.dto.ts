import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsMongoId, IsEnum } from 'class-validator';
import { CoreOutput } from './../../common/dtos/output.dto';
import { ContactType } from '../schemas/contact.schema';
import { Contact } from './../schemas/contact.schema';

@InputType()
export class GetSendHistoryInput {
  @Field((type) => String)
  @IsMongoId()
  formId: string;

  @Field((type) => ContactType)
  @IsEnum(ContactType)
  contactType: ContactType;
}

@ObjectType()
export class GetSendHistoryOutput extends CoreOutput {
  @Field((type) => [Contact], { nullable: true })
  contacts?: Contact[];
}
