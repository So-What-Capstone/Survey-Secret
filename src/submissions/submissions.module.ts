import { Module } from '@nestjs/common';
import { SubmissionsService } from './submissions.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Submission, SubmissionSchema } from './schemas/submission.schema';
import { SubmissionsResolver } from './submissions.resolver';
import { Form, FormSchema } from './../forms/schemas/form.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Submission.name,
        schema: SubmissionSchema,
      },
      {
        name: Form.name,
        schema: FormSchema,
      },
    ]),
  ],
  providers: [SubmissionsService, SubmissionsResolver],
  exports: [SubmissionsService],
})
export class SubmissionsModule {}
