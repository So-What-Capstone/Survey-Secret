import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsArray, IsMongoId, isMongoId } from 'class-validator';
import { CoreOutput } from './../../common/dtos/output.dto';

@InputType()
export class GetCorrInput {
  @Field((type) => String)
  @IsMongoId()
  formId: string;

  @Field((type) => [String])
  questionIds: [string];
}

@ObjectType()
export class GetCorrOutput extends CoreOutput {}
