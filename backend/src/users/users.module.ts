import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
import { UserSchema } from './schemas/user.schema';
import { UsersService } from './users.service';
import { UsersResolver } from './users.resolver';
import {
  Verification,
  VerificationSchema,
} from './schemas/verification.schema';
import { UploaderModule } from './../uploader/uploader.module';
import { SmsModule } from '../sms/sms.module';
import { SmsService } from 'src/sms/sms.service';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Verification.name,
        schema: VerificationSchema,
      },
    ]),
    UploaderModule,
  ],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
