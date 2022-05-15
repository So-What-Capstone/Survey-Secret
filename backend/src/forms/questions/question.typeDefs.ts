import { ClosedQuestion } from './schemas/closed-question.schema';
import { GridQuestion } from './schemas/grid-question.scheam';
import { LinearQuestion } from './schemas/linear-question.schema';
import { OpenedQuestion } from './schemas/opened-question.schema';
import { PersonalQuestion } from './schemas/personal-question.schema';
import { createUnionType, registerEnumType } from '@nestjs/graphql';

export enum QuestionType {
  Closed = 'Closed',
  Grid = 'Grid',
  Linear = 'Linear',
  Opened = 'Opened',
  Personal = 'Personal',
}

registerEnumType(QuestionType, { name: 'QuestionType' });

export const QuestionUnion = createUnionType({
  name: 'QuestionUnion',
  types: () => [
    ClosedQuestion,
    GridQuestion,
    LinearQuestion,
    OpenedQuestion,
    PersonalQuestion,
  ],
  resolveType: (obj) => {
    if (obj.kind === QuestionType.Closed) {
      return ClosedQuestion;
    } else if (obj.kind === QuestionType.Grid) {
      return GridQuestion;
    } else if (obj.kind === QuestionType.Linear) {
      return LinearQuestion;
    } else if (obj.kind === QuestionType.Personal) {
      return PersonalQuestion;
    } else if (obj.kind === QuestionType.Opened) {
      return OpenedQuestion;
    } else {
      return null;
    }
  },
});
