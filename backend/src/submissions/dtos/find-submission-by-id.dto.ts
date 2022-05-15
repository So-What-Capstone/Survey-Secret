import { Field, ObjectType, InputType } from '@nestjs/graphql';
import { Submission } from '../schemas/submission.schema';
import { CoreOutput } from './../../common/dtos/output.dto';

@InputType()
export class FindSubmissionByIdInput {
  @Field((type) => String)
  submissionId: string;
}

@ObjectType()
export class FindSubmissionByIdOutput extends CoreOutput {
  @Field((type) => Submission, { nullable: true })
  submission?: Submission;
}
