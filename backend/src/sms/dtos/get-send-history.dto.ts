import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsNumber, IsOptional } from 'class-validator';
import { CoreOutput } from './../../common/dtos/output.dto';

@InputType()
export class GetSendHistoryInput {
  @Field((type) => Number)
  @IsNumber()
  page: number;

  @Field((type) => Number)
  @IsNumber()
  pageSize: number;

  @Field((type) => Number, { nullable: true })
  @IsNumber()
  @IsOptional()
  startDate?: number;

  @Field((type) => Number, { nullable: true })
  @IsNumber()
  @IsOptional()
  limitDate?: number;
}

@ObjectType()
export class GetSendHistoryOutput extends CoreOutput {
  @Field((type) => [String], { nullable: true })
  data?: string[];
}
