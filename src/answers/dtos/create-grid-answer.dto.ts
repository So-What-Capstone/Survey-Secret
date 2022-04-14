import {
  Field,
  InputType,
  IntersectionType,
  ObjectType,
  PickType,
} from '@nestjs/graphql';
import { CoreOutput } from '../../common/dtos/output.dto';
import { QuestionType } from '../../questions/question.typeDefs';
import { GridAnswer } from '../schemas/grid-answer.schema';
import { CommonCreateAnswerInput } from './common-create-answer.dto';

@InputType()
export class CreateGridAnswerInputType extends IntersectionType(
  PickType(GridAnswer, ['content']),
  CommonCreateAnswerInput,
) {}

@InputType()
export class CreateGridAnswerInput {
  @Field((type) => CreateGridAnswerInputType)
  answer: CreateGridAnswerInputType;

  @Field((type) => QuestionType)
  type: string;
}

@ObjectType()
export class CreateLinearAnswerOutput extends CoreOutput {}
