import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Answer } from './answer.schema';
import { Prop } from '@nestjs/mongoose';

@InputType('GridAnswerContentInputType', { isAbstract: true })
@ObjectType()
export class GridAnswerContent {
  @Field((type) => Number)
  rowNo: number;

  @Field((type) => Number)
  colNo: number;
}

@InputType('GridAnswerInputType', { isAbstract: true })
@ObjectType()
export class GridAnswer extends Answer {
  @Field((type) => [GridAnswerContent], { nullable: true })
  @Prop({
    type: [
      {
        rowNo: { type: Number },
        colNo: { type: Number },
      },
    ],
  })
  content: GridAnswerContent[];
}
