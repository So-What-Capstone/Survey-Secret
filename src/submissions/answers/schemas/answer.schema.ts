import { Field, ObjectType } from '@nestjs/graphql';
import { QuestionUnion } from './../../../forms/questions/question.typeDefs';

@ObjectType()
export class Answer {
  //Answer에서 특정 QUestion을 접근할 일이 있을지?
  //1. Question Obj 저장, 2. QuestionId만 저장
  @Field((type) => QuestionUnion)
  question: typeof QuestionUnion;
}
