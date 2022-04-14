import { InputType, ObjectType, PickType, Field } from '@nestjs/graphql';
import { CreateAnswerInput } from '../../answers/dtos/create-answer.dto';
import { CoreOutput } from './../../common/dtos/output.dto';

@InputType()
export class CreateSubmissionInput {
  @Field((type) => String)
  formId: string;

  @Field((type) => [CreateAnswerInput], { nullable: true })
  answers?: CreateAnswerInput[];
}

@ObjectType()
export class CreateSubmissionOutput extends CoreOutput {}
