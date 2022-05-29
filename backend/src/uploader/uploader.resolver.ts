import { Args, Query } from '@nestjs/graphql';
import { Resolver } from '@nestjs/graphql';
import { UploaderService } from './uploader.service';

@Resolver()
export class UploaderResolver {
  constructor(private readonly uploaderService: UploaderService) {}

  @Query((returns) => String)
  getSignedUrl(@Args('input') key: string): string {
    return this.uploaderService.getSignedUrl(key);
  }
}
