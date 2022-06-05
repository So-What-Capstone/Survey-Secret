import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsOptional, IsMongoId, IsEnum } from 'class-validator';
import { CoreOutput } from './../../common/dtos/output.dto';
import { GraphQLJSONObject } from 'graphql-type-json';
import { ContactType } from '../schemas/contact.schema';

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
  @Field((type) => [GraphQLJSONObject], { nullable: true })
  data?: object[];
}
