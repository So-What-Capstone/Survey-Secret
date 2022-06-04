import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';
import { QuestionUnion } from 'src/forms/questions/question.typeDefs';
import { AnswerUnion } from '../answers/answer.typeDefs';
import { CoreOutput } from './../../common/dtos/output.dto';

@InputType()
export class FindAnswerByQuestionIdInput {
  @Field((type) => String)
  @IsMongoId()
  formId: string;

  @Field((type) => String)
  @IsMongoId()
  questionId: string;
}

@ObjectType()
export class FindAnswerByQuestionIdOutput extends CoreOutput {
  @Field((type) => [AnswerUnion], { nullable: true })
  answers?: typeof AnswerUnion[];

  @Field((type) => QuestionUnion, { nullable: true })
  question?: typeof QuestionUnion;
}
