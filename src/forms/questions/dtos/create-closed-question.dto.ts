import {
  Field,
  InputType,
  IntersectionType,
  ObjectType,
  PickType,
} from '@nestjs/graphql';
import { ClosedQuestion } from '../schemas/closed-question.schema';
import { CoreOutput } from '../../../common/dtos/output.dto';
import { CommonCreateQuestionInput } from './common-create-question.dto';
import { QuestionType } from 'src/forms/questions/question.typeDefs';

@InputType()
export class CreateClosedQuestionInputType extends IntersectionType(
  PickType(ClosedQuestion, ['choices', 'type']),
  CommonCreateQuestionInput,
) {}

@InputType()
export class CreateClosedQuestionInput {
  @Field((type) => CreateClosedQuestionInputType)
  question: CreateClosedQuestionInputType;

  @Field((type) => QuestionType)
  type: string;
}

@ObjectType()
export class CreateClosedQuestionOutput extends CoreOutput {}
