import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { PersonalQuestion } from '../schemas/personal-question.schema';
import { CoreOutput } from '../../common/dtos/output.dto';

@InputType()
export class CreatePersonalQuestionInput extends PickType(PersonalQuestion, [
  'content',
  'description',
  'required',
  'order',
  'type',
  'encoded',
]) {}

@ObjectType()
export class CreatePersonalQuestionOutput extends CoreOutput {}
