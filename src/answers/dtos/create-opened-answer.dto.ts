import {
  Field,
  InputType,
  IntersectionType,
  ObjectType,
  PickType,
} from '@nestjs/graphql';
import { OpenedAnswer } from '../schemas/opened-answer.schema';
import { CommonCreateAnswerInput } from './common-create-answer.dto';
import { CoreOutput } from './../../common/dtos/output.dto';
import { QuestionType } from '../../questions/question.typeDefs';

@InputType()
export class CreateOpenedAnswerInputType extends IntersectionType(
  PickType(OpenedAnswer, ['content']),
  CommonCreateAnswerInput,
) {}

@InputType()
export class CreateOpenedAnswerInput {
  @Field((type) => CreateOpenedAnswerInputType)
  answer: CreateOpenedAnswerInputType;

  @Field((type) => QuestionType)
  type: string;
}

@ObjectType()
export class CreateOpenedAnswerOutput extends CoreOutput {}
