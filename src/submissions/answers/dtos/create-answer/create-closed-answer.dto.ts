import {
  InputType,
  ObjectType,
  PickType,
  IntersectionType,
  Field,
} from '@nestjs/graphql';
import { ClosedAnswer } from '../../schemas/closed-answer.schema';
import { CoreOutput } from '../../../../common/dtos/output.dto';
import { CommonCreateAnswerInput } from '../common-create-answer.dto';
import { QuestionType } from '../../../../forms/questions/question.typeDefs';

@InputType()
export class CreateClosedAnswerInputType extends IntersectionType(
  PickType(ClosedAnswer, ['no']),
  CommonCreateAnswerInput,
) {}

@InputType()
export class CreateClosedAnswerInput {
  @Field((type) => CreateClosedAnswerInputType)
  answer: CreateClosedAnswerInputType;

  @Field((type) => QuestionType)
  type: string;
}

@ObjectType()
export class CreateClosedAnswerOutput extends CoreOutput {}
