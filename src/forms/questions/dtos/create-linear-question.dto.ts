import {
  InputType,
  ObjectType,
  PickType,
  IntersectionType,
  Field,
} from '@nestjs/graphql';
import { LinearQuestion } from '../schemas/linear-question.schema';
import { CoreOutput } from '../../../common/dtos/output.dto';
import { CommonCreateQuestionInput } from './common-create-question.dto';
import { QuestionType } from 'src/forms/questions/question.typeDefs';

@InputType()
export class CreateLinearQuestionInput extends IntersectionType(
  CommonCreateQuestionInput,
  PickType(LinearQuestion, [
    'leftLabel',
    'rightLabel',
    'leftRange',
    'rightRange',
  ]),
) {}

@ObjectType()
export class CreateLinearQuestionOutput extends CoreOutput {}
