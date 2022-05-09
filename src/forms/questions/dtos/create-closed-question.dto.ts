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
export class CreateClosedQuestionInput extends IntersectionType(
  PickType(ClosedQuestion, ['choices', 'closedType']),
  CommonCreateQuestionInput,
) {}

@ObjectType()
export class CreateClosedQuestionOutput extends CoreOutput {}
