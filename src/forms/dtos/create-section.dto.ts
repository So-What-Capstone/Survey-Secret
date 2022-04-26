import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { CreateGridQuestionInput } from '../questions/dtos/create-grid-question.dto';
import { CreateLinearQuestionInput } from '../questions/dtos/create-linear-question.dto';
import { CreatePersonalQuestionInput } from '../questions/dtos/create-personal-question.dto';
import { CreateClosedQuestionInput } from '../questions/dtos/create-closed-question.dto';
import { CreateOpenedQuestionInput } from '../questions/dtos/create-opened-question.dto';
import { Section } from '../schemas/section.schema';
import { CoreOutput } from './../../common/dtos/output.dto';

@InputType()
export class CreateSectionInput extends PickType(Section, ['title']) {
  @Field((type) => [CreateOpenedQuestionInput], { nullable: true })
  opened?: CreateOpenedQuestionInput[];

  @Field((type) => [CreateClosedQuestionInput], { nullable: true })
  closed?: CreateClosedQuestionInput[];

  @Field((type) => [CreateGridQuestionInput], { nullable: true })
  grid?: CreateGridQuestionInput[];

  @Field((type) => [CreatePersonalQuestionInput], { nullable: true })
  personal?: CreatePersonalQuestionInput[];

  @Field((type) => [CreateLinearQuestionInput], { nullable: true })
  linear?: CreateLinearQuestionInput[];
}

@ObjectType()
export class CreateSectionOutput extends CoreOutput {}
