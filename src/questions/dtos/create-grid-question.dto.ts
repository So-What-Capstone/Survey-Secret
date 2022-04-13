import {
  InputType,
  ObjectType,
  PickType,
  IntersectionType,
  Field,
} from '@nestjs/graphql';
import { CoreOutput } from './../../common/dtos/output.dto';
import { GridQuestion } from './../schemas/grid-question.scheam';
import { CommonCreateQuestionInput } from './create-question.dto';
import { QuestionType } from 'src/questions/question.typeDefs';

@InputType()
export class CreateGridQuestionInputType extends IntersectionType(
  CommonCreateQuestionInput,
  PickType(GridQuestion, ['rowContent', 'colContent', 'type']),
) {}

@InputType()
export class CreateGridQuestionInput {
  @Field((type) => CreateGridQuestionInputType)
  question: CreateGridQuestionInputType;

  @Field((type) => QuestionType)
  type: string;
}

@ObjectType()
export class CreateGridQuestionOutput extends CoreOutput {}
