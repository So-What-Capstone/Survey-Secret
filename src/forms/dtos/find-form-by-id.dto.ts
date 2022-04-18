import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { CoreOutput } from '../../common/dtos/output.dto';
import { Form } from '../schemas/form.schema';

@InputType()
export class FindFormByIdInput {
  @Field((type) => String)
  formId: string;
}

@ObjectType()
export class FIndFormByIdOutput extends CoreOutput {
  @Field((type) => Form, { nullable: true })
  form?: Form;
}
