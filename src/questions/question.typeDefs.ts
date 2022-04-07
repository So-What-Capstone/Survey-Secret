import { ClosedQuestion } from './schemas/closed-question.schema';
import { GridQuestion } from './schemas/grid-question.scheam';
import { LinearQuestion } from './schemas/linear-question.schema';
import { OpenedQuestion } from './schemas/opened-question.schema';
import { PersonalQuestion } from './schemas/personal-question.schema';
import { createUnionType } from '@nestjs/graphql';

//공통 말고, 전체 question type
export type QuestionType = {
  type:
    | 'ClosedQuestion'
    | 'GridQuestion'
    | 'LinearQuestion'
    | 'OpenedQuestion'
    | 'PersonalQuestion';
  question:
    | ClosedQuestion
    | GridQuestion
    | LinearQuestion
    | OpenedQuestion
    | PersonalQuestion;
};

export const QuestionUnion = createUnionType({
  name: 'QuestionUnion',
  types: () =>
    [
      ClosedQuestion,
      GridQuestion,
      LinearQuestion,
      OpenedQuestion,
      PersonalQuestion,
    ] as const,
});
