import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { Section } from '../schemas/section.schema';
import { CoreOutput } from './../../common/dtos/output.dto';

@InputType()
export class CreateSectionInput extends PickType(Section, ['title', 'order']) {
  @Field((type) => String)
  formId: String;
}

@ObjectType()
export class CreateSectionOutput extends CoreOutput {}
