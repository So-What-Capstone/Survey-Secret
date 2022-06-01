import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';
import { CoreOutput } from './../../common/dtos/output.dto';

@InputType()
export class DeleteSubmissionInput {
  @Field((type) => String)
  @IsMongoId()
  submissionId: string;
}

@ObjectType()
export class DeleteSubmissionOutput extends CoreOutput {}
