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
export class CreateClosedAnswerInput extends IntersectionType(
  PickType(ClosedAnswer, ['no']),
  CommonCreateAnswerInput,
) {}

@ObjectType()
export class CreateClosedAnswerOutput extends CoreOutput {}
