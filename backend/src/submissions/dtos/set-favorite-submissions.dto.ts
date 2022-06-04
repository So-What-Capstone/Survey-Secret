import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsMongoId } from 'class-validator';
import { CoreOutput } from '../../common/dtos/output.dto';

@InputType()
export class FavoriteSubmission {
  @Field((type) => String)
  @IsMongoId()
  submissionId: string;

  @Field((type) => Boolean)
  @IsBoolean()
  isFavorite: boolean;
}

@InputType()
export class SetFavoriteSubmissionsInput {
  @Field((type) => String)
  @IsMongoId()
  formId: string;

  @Field((type) => [FavoriteSubmission])
  favoriteSubmissions: FavoriteSubmission[];
}

@ObjectType()
export class SetFavoriteSubmissionsOutput extends CoreOutput {}
