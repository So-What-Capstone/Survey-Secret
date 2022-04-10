import { InputType, ObjectType, PickType, Field } from '@nestjs/graphql';
import { CoreOutput } from './../../common/dtos/output.dto';

@InputType()
export class CreateSubmissionInput {
  @Field((type) => String)
  formId: string;
}

@ObjectType()
export class CreateSubmissionOutput extends CoreOutput {}
