import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { IsMongoId, IsOptional } from 'class-validator';
import { Form } from '../schemas/form.schema';
import { CoreOutput } from './../../common/dtos/output.dto';

@InputType()
export class SearchFormsInput extends PickType(Form, ['title']) {
  @Field((type) => String, { nullable: true })
  @IsMongoId()
  @IsOptional()
  lastId?: string;
}

@ObjectType()
export class SearchFormsOutput extends CoreOutput {
  @Field((type) => [Form], { nullable: true })
  forms?: Form[];

  @Field((type) => String, { nullable: true })
  @IsOptional()
  @IsMongoId()
  lastId?: string;
}
