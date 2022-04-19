import { Module } from '@nestjs/common';
import { FormsService } from './forms.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Form, FormSchema } from './schemas/form.schema';
import { User, UserSchema } from '../users/schemas/user.schema';
import { FormsResolver } from './forms.resolver';
import {
  SubmissionSchema,
  Submission,
} from '../submissions/schemas/submission.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Form.name,
        schema: FormSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
      },
      {
        name: Submission.name,
        schema: SubmissionSchema,
      },
    ]),
  ],
  providers: [FormsService, FormsResolver],
  exports: [FormsService],
})
export class FormsModule {}
