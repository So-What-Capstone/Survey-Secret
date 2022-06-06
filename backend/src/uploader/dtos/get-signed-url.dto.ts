import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { CoreOutput } from './../../common/dtos/output.dto';

export enum ImageType {
  User = 'Users',
  Question = 'Questions',
  Submission = 'Submissions',
}

registerEnumType(ImageType, { name: 'ImageType' });

@InputType()
export class GetSignedUrlInput {
  @Field((type) => ImageType)
  imageType: ImageType;

  @Field((type) => String)
  fileName: string;

  @Field((type) => String)
  contentType: string;
}

@ObjectType()
export class GetSignedUrlOutput extends CoreOutput {
  @Field((type) => String, { nullable: true })
  url?: string;
}
