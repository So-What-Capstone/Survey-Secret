import {
  InputType,
  ObjectType,
  PickType,
  IntersectionType,
  Field,
} from '@nestjs/graphql';
import { PersonalQuestion } from '../schemas/personal-question.schema';
import { CoreOutput } from '../../common/dtos/output.dto';
import { CommonCreateQuestionInput } from './create-question.dto';
import { QuestionType } from 'src/questions/question.typeDefs';

@InputType()
export class CreatePersonalQuestionInputType extends IntersectionType(
  CommonCreateQuestionInput,
  PickType(PersonalQuestion, ['type', 'encoded']),
) {}

@InputType()
export class CreatePersonalQuestionInput {
  @Field((type) => CreatePersonalQuestionInputType)
  question: CreatePersonalQuestionInputType;

  @Field((type) => QuestionType)
  type: string;
}

@ObjectType()
export class CreatePersonalQuestionOutput extends CoreOutput {}
