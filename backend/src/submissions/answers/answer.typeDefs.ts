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
  resolveType: (obj) => {
    if (obj.kind === QuestionType.Closed) {
      return ClosedAnswer;
    } else if (obj.kind === QuestionType.Grid) {
      return GridAnswer;
    } else if (obj.kind === QuestionType.Linear) {
      return LinearAnswer;
    } else if (obj.kind === QuestionType.Personal) {
      return PersonalAnswer;
    } else if (obj.kind === QuestionType.Opened) {
      return OpenedAnswer;
    } else {
      return null;
    }
  },
});
