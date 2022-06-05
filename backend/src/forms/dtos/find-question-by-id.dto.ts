import { InputType, ObjectType, Field } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';
import { CoreOutput } from './../../common/dtos/output.dto';
import { QuestionUnion } from '../../forms/questions/question.typeDefs';

@InputType()
export class FindQuestionByIdInput {
  @Field((type) => String)
  @IsMongoId()
  formId: string;

  @Field((type) => String)
  @IsMongoId()
  questionId: string;
}

@ObjectType()
export class FindQuestionByIdOutput extends CoreOutput {
  @Field((type) => QuestionUnion, { nullable: true })
  question?: typeof QuestionUnion;
}
