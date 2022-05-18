import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';
import { CoreOutput } from './../../common/dtos/output.dto';

@InputType()
export class DeleteFormInput {
  @Field((type) => String)
  @IsMongoId()
  formId: string;
}

@ObjectType()
export class DeleteFormOutput extends CoreOutput {}
