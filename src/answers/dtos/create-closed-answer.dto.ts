import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { ClosedAnswer } from '../schemas/closed-answer.schema';
import { CoreOutput } from './../../common/dtos/output.dto';

@InputType()
export class CreateClosedAnswerInput extends PickType(ClosedAnswer, ['no']) {
  @Field((type) => String)
  submissionId: string;

  @Field((type) => String)
  questionId: string;
}

@ObjectType()
export class CreateClosedAnswerOutput extends CoreOutput {}
