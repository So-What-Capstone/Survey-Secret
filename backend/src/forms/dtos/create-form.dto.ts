import { InputType, ObjectType, PickType, Field } from '@nestjs/graphql';
import { IsMongoId, IsOptional } from 'class-validator';
import { Form } from '../schemas/form.schema';
import { CoreOutput } from '../../common/dtos/output.dto';
import { CreateSectionInput } from './create-section.dto';

@InputType()
export class CreateFormInput extends PickType(Form, [
  'title',
  'description',
  'expiredAt',
  'privacyExpiredAt',
  'state',
]) {
  @Field((type) => [CreateSectionInput], { nullable: true })
  sections?: CreateSectionInput[];
}

@ObjectType()
export class CreateFormOutput extends CoreOutput {
  @Field((type) => String, { nullable: true })
  @IsMongoId()
  @IsOptional()
  formId?: string;
}
