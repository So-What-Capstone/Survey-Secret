import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';
import { CoreOutput } from '../../common/dtos/output.dto';

@InputType()
export class ToggleFavoriteSubmissionInput {
  @Field((type) => String)
  @IsMongoId()
  formId: string;

  @Field((type) => [String])
  @IsMongoId({ each: true })
  submissionIds: string[];
}

@ObjectType()
export class ToggleFavoriteSubmissionsOutput extends CoreOutput {}
