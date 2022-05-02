import {
  Field,
  InputType,
  IntersectionType,
  ObjectType,
  PickType,
} from '@nestjs/graphql';
import { OpenedAnswer } from '../../schemas/opened-answer.schema';
import { CoreOutput } from '../../../../common/dtos/output.dto';
import { QuestionType } from '../../../../forms/questions/question.typeDefs';
import { CommonCreateAnswerInput } from '../common-create-answer.dto';

@InputType()
export class CreateOpenedAnswerInput extends IntersectionType(
  PickType(OpenedAnswer, ['content']),
  CommonCreateAnswerInput,
) {}

@ObjectType()
export class CreateOpenedAnswerOutput extends CoreOutput {}
