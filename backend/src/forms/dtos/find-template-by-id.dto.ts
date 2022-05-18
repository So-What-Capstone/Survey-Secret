import { Field, InputType, ObjectType, PickType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';
import { Template } from '../schemas/template.schema';
import { CoreOutput } from '../../common/dtos/output.dto';

@InputType()
export class FindTemplateByIdInput {
  @Field((type) => String)
  @IsMongoId()
  templateId: string;
}

@ObjectType()
export class FindTemplateByIdOutput extends CoreOutput {
  @Field((type) => Template, { nullable: true })
  template?: Template;
}
