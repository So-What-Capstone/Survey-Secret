import {
  Field,
  InputType,
  PickType,
  IntersectionType,
  ObjectType,
} from '@nestjs/graphql';
import { LinearAnswer } from '../../schemas/linear-answer.schema';
import { CoreOutput } from '../../../../common/dtos/output.dto';
import { QuestionType } from '../../../../forms/questions/question.typeDefs';
import { CommonCreateAnswerInput } from '../common-create-answer.dto';

@InputType()
export class CreateLinearAnswerInput extends IntersectionType(
  PickType(LinearAnswer, ['no']),
  CommonCreateAnswerInput,
) {}

@ObjectType()
export class CreateLinearAnswerOutput extends CoreOutput {}
