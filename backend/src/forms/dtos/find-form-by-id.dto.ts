import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';
import { CoreOutput } from '../../common/dtos/output.dto';
import { Form } from '../schemas/form.schema';

@InputType()
export class FindFormByIdInput {
  @Field((type) => String)
  @IsMongoId()
  formId: string;
}

@ObjectType()
export class FIndFormByIdOutput extends CoreOutput {
  @Field((type) => Form, { nullable: true })
  form?: Form;
}
