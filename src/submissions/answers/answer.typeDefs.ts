import { QuestionType } from 'src/forms/questions/question.typeDefs';
import { ClosedAnswer } from './schemas/closed-answer.schema';
import { GridAnswer } from './schemas/grid-answer.schema';
import { LinearAnswer } from './schemas/linear-answer.schema';
import { OpenedAnswer } from './schemas/opened-answer.schema';
import { PersonalAnswer } from './schemas/personal-answer.schema';
import { createUnionType, ObjectType, Field } from '@nestjs/graphql';

export const AnswerUnion = createUnionType({
  name: 'AnswerUnion',
  types: () => [
    ClosedAnswer,
    GridAnswer,
    LinearAnswer,
    OpenedAnswer,
    PersonalAnswer,
  ],
});

@ObjectType()
export class AnswerUnionType {
  @Field((type) => AnswerUnion)
  answer: typeof AnswerUnion;

  @Field((type) => QuestionType)
  type: string;
}
