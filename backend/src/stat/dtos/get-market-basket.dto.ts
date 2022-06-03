import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { GetCorrInput } from './get-corr.dto';
import { CoreOutput } from './../../common/dtos/output.dto';
import { GraphQLJSONObject } from 'graphql-type-json';

@InputType()
export class GetMarketBasketInput extends GetCorrInput {}

@ObjectType()
export class GetMarketBasketOutput extends CoreOutput {
  @Field((type) => [GraphQLJSONObject], { nullable: true })
  result?: object[];
}
