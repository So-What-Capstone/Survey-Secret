import {
  Field,
  InputType,
  ObjectType,
  PickType,
  registerEnumType,
} from '@nestjs/graphql';
import {
  IsBoolean,
  IsMongoId,
  IsOptional,
  IsString,
  IsEnum,
} from 'class-validator';
import { Form } from '../schemas/form.schema';
import { CoreOutput } from './../../common/dtos/output.dto';
import { ObjectId } from 'mongoose';

export enum SortKey {
  expiredAt = 'expiredAt',
  privacyExpiredAt = 'privacyExpiredAt',
}

registerEnumType(SortKey, { name: 'SortKey' });

@InputType()
export class SearchFormsInput extends PickType(Form, ['title']) {
  @Field((type) => String, { nullable: true })
  @IsMongoId()
  @IsOptional()
  lastId?: string;

  @Field((type) => SortKey, { nullable: true })
  @IsOptional()
  @IsEnum(SortKey)
  sortKey?: SortKey;

  @Field((type) => Boolean, { nullable: true })
  @IsOptional()
  @IsBoolean()
  desc?: boolean;
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
