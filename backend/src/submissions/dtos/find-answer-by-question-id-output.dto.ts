import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsMongoId } from 'class-validator';
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
export class AnswersInFindAnswerByQuestionId {
  @Field((type) => AnswerUnion)
  answer?: typeof AnswerUnion;

  @Field((type) => String, { nullable: true })
  @IsMongoId()
  submissionId?: string;

  @Field((type) => Boolean, { nullable: true })
  @IsBoolean()
  isFavorite?: boolean;
}

@ObjectType()
export class FindAnswerByQuestionIdOutput extends CoreOutput {
  @Field((type) => [AnswersInFindAnswerByQuestionId], { nullable: true })
  answers?: AnswersInFindAnswerByQuestionId[];

  @Field((type) => QuestionUnion, { nullable: true })
  question?: typeof QuestionUnion;
}
