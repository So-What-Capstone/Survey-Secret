import { Args, Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import {
  GetSignedUrlInput,
  GetSignedUrlOutput,
} from './dtos/get-signed-url.dto';
import { UploaderService } from './uploader.service';

@Resolver()
export class UploaderResolver {
  constructor(private readonly uploaderService: UploaderService) {}

  @Query((returns) => GetSignedUrlOutput)
  getSignedUrl(
    @Args('input') getSignedUrlInput: GetSignedUrlInput,
  ): GetSignedUrlOutput {
    return this.uploaderService.getSignedUrl(getSignedUrlInput);
  }
}
