import { InputType, ObjectType, PickType, Field } from '@nestjs/graphql';
import { CreateAnswersInput } from '../answers/dtos/create-answers.dto';
import { CoreOutput } from './../../common/dtos/output.dto';

@InputType()
export class SectionInCreateSubmissionInput {
  @Field((type) => String)
  sectionId: string;

  @Field((type) => [CreateAnswersInput], { nullable: true })
  answers?: CreateAnswersInput[];
}

@InputType()
export class CreateSubmissionInput {
  @Field((type) => String)
  formId: string;

  @Field((type) => [SectionInCreateSubmissionInput])
  sections: SectionInCreateSubmissionInput[];
}

@ObjectType()
export class CreateSubmissionOutput extends CoreOutput {}
