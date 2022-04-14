import {
  InputType,
  ObjectType,
  PickType,
  IntersectionType,
  Field,
} from '@nestjs/graphql';
import { Form } from '../schemas/form.schema';
import { CoreOutput } from './../../common/dtos/output.dto';
import { CreateSectionInput } from './create-section.dto';

@InputType()
export class CreateFormInput extends PickType(Form, ['title', 'description']) {
  @Field((type) => [CreateSectionInput], { nullable: true })
  sections?: CreateSectionInput[];
}

@ObjectType()
export class CreateFormOutput extends CoreOutput {}
