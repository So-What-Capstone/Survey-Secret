import { Field, ObjectType } from '@nestjs/graphql';
import { Submission } from '../schemas/submission.schema';
import { CoreOutput } from './../../common/dtos/output.dto';

@ObjectType()
export class FindSubmissionByIdOutput extends CoreOutput {
  @Field((type) => Submission, { nullable: true })
  submission?: Submission;
}
