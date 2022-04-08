import { ClosedQuestion } from './schemas/closed-question.schema';
import { GridQuestion } from './schemas/grid-question.scheam';
import { LinearQuestion } from './schemas/linear-question.schema';
import { OpenedQuestion } from './schemas/opened-question.schema';
import { PersonalQuestion } from './schemas/personal-question.schema';
import { createUnionType, Field, InputType, ObjectType } from '@nestjs/graphql';

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
  types: () => [
    ClosedQuestion,
    GridQuestion,
    LinearQuestion,
    OpenedQuestion,
    PersonalQuestion,
  ],
  resolveType: (obj, context, info) => {
    if (obj.choices) {
      return ClosedQuestion;
    } else if (obj.rowContent) {
      return GridQuestion;
    } else if (obj.leftRange) {
      return LinearQuestion;
    } else if (obj.encoded) {
      return PersonalQuestion;
    } else if (obj.type) {
      return OpenedQuestion;
    } else {
      return null;
    }
  },
});

@ObjectType()
export class QuestionUnionType {
  @Field((type) => QuestionUnion)
  question: typeof QuestionUnion;

  @Field((type) => String)
  type: string;
}
