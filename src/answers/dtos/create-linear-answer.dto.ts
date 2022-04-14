import {
  Field,
  InputType,
  PickType,
  IntersectionType,
  ObjectType,
} from '@nestjs/graphql';
import { LinearAnswer } from '../schemas/linear-answer.schema';
import { CommonCreateAnswerInput } from './common-create-answer.dto';
import { CoreOutput } from './../../common/dtos/output.dto';
import { QuestionType } from 'src/questions/question.typeDefs';

@InputType()
export class CreateLinearAnswerInputType extends IntersectionType(
  PickType(LinearAnswer, ['no']),
  CommonCreateAnswerInput,
) {}

@InputType()
export class CreateLinearAnswerInput {
  @Field((type) => CreateLinearAnswerInputType)
  answer: CreateLinearAnswerInputType;

  @Field((type) => QuestionType)
  type: string;
}

@ObjectType()
export class CreateLinearAnswerOutput extends CoreOutput {}
