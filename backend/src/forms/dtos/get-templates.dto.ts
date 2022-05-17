import { Field, ObjectType } from '@nestjs/graphql';
import { Template } from '../schemas/template.schema';
import { CoreOutput } from './../../common/dtos/output.dto';

@ObjectType()
export class GetTemplatesOutput extends CoreOutput {
  @Field((type) => [Template], { nullable: true })
  templates?: Template[];
}
