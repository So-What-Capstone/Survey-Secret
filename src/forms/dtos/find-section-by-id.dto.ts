import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { Section } from '../schemas/section.schema';
import { CoreOutput } from '../../common/dtos/output.dto';
import { IsMongoId } from 'class-validator';

@InputType()
export class FindSectionByIdInput {
  @Field((type) => String)
  @IsMongoId()
  sectionId: string;
}

@ObjectType()
export class FindSectionByIdOutput extends CoreOutput {
  @Field((type) => Section, { nullable: true })
  section?: Section;
}
