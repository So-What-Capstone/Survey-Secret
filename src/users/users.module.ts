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
  ],
  providers: [UsersService, UsersResolver],
  exports: [UsersService],
})
export class UsersModule {}
