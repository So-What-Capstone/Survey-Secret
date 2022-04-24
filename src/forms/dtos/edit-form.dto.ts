import { Field, InputType, ObjectType, PartialType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';
import { CoreOutput } from '../../common/dtos/output.dto';
import { CreateFormInput } from './craete-form.dto';

@InputType()
export class EditFormInput extends PartialType(CreateFormInput) {
  @Field((type) => String)
  @IsMongoId()
  formId: string;
}

@ObjectType()
export class EditFormOutput extends CoreOutput {}
