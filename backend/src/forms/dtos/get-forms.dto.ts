import {
  Field,
  InputType,
  IntersectionType,
  ObjectType,
  PickType,
} from '@nestjs/graphql';
import { Form } from '../schemas/form.schema';
import { CoreOutput } from './../../common/dtos/output.dto';
import { SearchFormsInput, SearchFormsOutput } from './search-forms.dto';

@InputType()
export class GetFormsInput extends PickType(SearchFormsInput, ['lastId']) {}

@ObjectType()
export class GetFormsOutput extends IntersectionType(
  CoreOutput,
  PickType(SearchFormsOutput, ['lastId']),
) {
  @Field((type) => [Form], { nullable: true })
  forms?: Form[];
}
