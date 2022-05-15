import {
  Field,
  InputType,
  IntersectionType,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';
import { CoreOutput } from '../../common/dtos/output.dto';
import { Form } from '../schemas/form.schema';
import { CreateFormInput } from './craete-form.dto';

@InputType()
export class EditFormInput extends IntersectionType(
  PartialType(CreateFormInput),
  PickType(Form, ['state', 'representativeQuestion']),
) {
  @Field((type) => String)
  @IsMongoId()
  formId: string;
}

@ObjectType()
export class EditFormOutput extends CoreOutput {}
