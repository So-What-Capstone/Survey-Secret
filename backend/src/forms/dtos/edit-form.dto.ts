import {
  Field,
  InputType,
  IntersectionType,
  ObjectType,
  PartialType,
  PickType,
} from '@nestjs/graphql';
import { IsBoolean, IsMongoId, IsOptional } from 'class-validator';
import { CoreOutput } from '../../common/dtos/output.dto';
import { Form } from '../schemas/form.schema';
import { CreateFormInput } from './create-form.dto';

@InputType()
export class EditFormInput extends PartialType(CreateFormInput) {
  @Field((type) => String)
  @IsMongoId()
  formId: string;

  @Field((type) => String)
  @IsMongoId()
  representativeQuestionId: string;

  @Field((type) => Boolean, { nullable: true })
  @IsBoolean()
  @IsOptional()
  isPromoted?: boolean;
}

@ObjectType()
export class EditFormOutput extends CoreOutput {}
