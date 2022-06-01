import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StatService } from './stat.service';
import {
  Submission,
  SubmissionSchema,
} from '../submissions/schemas/submission.schema';
import { StatResolver } from './stat.resolver';
import { FormSchema, Form } from '../forms/schemas/form.schema';

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
  providers: [StatService, StatResolver],
  exports: [StatService],
})
export class StatModule {}
