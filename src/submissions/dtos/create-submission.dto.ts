import { InputType, ObjectType, PickType, Field } from '@nestjs/graphql';
import { CreateAnswersInput } from '../answers/dtos/create-answers.dto';
import { CoreOutput } from './../../common/dtos/output.dto';

@InputType()
export class CreateSubmissionInput {
  @Field((type) => String)
  formId: string;

  @Field((type) => [CreateAnswersInput], { nullable: true })
  answers?: CreateAnswersInput[];
}

@ObjectType()
export class CreateSubmissionOutput extends CoreOutput {}
