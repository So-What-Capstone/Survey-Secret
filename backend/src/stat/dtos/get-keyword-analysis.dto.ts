import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsMongoId } from 'class-validator';
import { CoreOutput } from './../../common/dtos/output.dto';

@InputType()
export class GetKeywordAnalysisInput {
  @Field((type) => String)
  @IsMongoId()
  formId: string;

  @Field((type) => String)
  @IsMongoId()
  questionId: string;
}

@ObjectType()
export class GetKeywordAnalysisOutput extends CoreOutput {
  @Field((type) => [[String, Number]], { nullable: true })
  result?: [string, number][];
}
