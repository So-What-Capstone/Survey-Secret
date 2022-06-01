import { Module } from '@nestjs/common';
import { UploaderService } from './uploader.service';
import { UploaderResolver } from './uploader.resolver';

@Module({
  providers: [UploaderService, UploaderResolver],
  exports: [UploaderService],
})
export class UploaderModule {}
