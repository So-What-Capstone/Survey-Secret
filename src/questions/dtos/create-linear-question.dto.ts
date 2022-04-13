import {
  InputType,
  ObjectType,
  PickType,
  IntersectionType,
  Field,
} from '@nestjs/graphql';
import { LinearQuestion } from '../schemas/linear-question.schema';
import { CoreOutput } from './../../common/dtos/output.dto';
import { CommonCreateQuestionInput } from './create-question.dto';
import { QuestionType } from 'src/questions/question.typeDefs';

@InputType()
export class CreateLinearQuestionInputType extends IntersectionType(
  CommonCreateQuestionInput,
  PickType(LinearQuestion, [
    'leftLabel',
    'rightLabel',
    'leftRange',
    'rightRange',
  ]),
) {}

@InputType()
export class CreateLinearQuestionInput {
  @Field((type) => CreateLinearQuestionInputType)
  question: CreateLinearQuestionInputType;

  @Field((type) => QuestionType)
  type: string;
}

@ObjectType()
export class CreateLinearQuestionOutput extends CoreOutput {}
