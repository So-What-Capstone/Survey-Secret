import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Submission, SubmissionDocument } from './schemas/submission.schema';
import { Model } from 'mongoose';
import {
  CreateSubmissionInput,
  CreateSubmissionOutput,
} from './dtos/create-submission.dto';

import { Form, FormDocument } from '../forms/schemas/form.schema';

@Injectable()
export class SubmissionsService {
  constructor(
    @InjectModel(Submission.name)
    private readonly submissionModel: Model<SubmissionDocument>,
    @InjectModel(Form.name)
    private readonly formModel: Model<FormDocument>,
  ) {}

  async createSubmission({
    formId,
  }: CreateSubmissionInput): Promise<CreateSubmissionOutput> {
    try {
      const form = await this.formModel.findById(formId);

      const submission = await this.submissionModel.create({
        form,
      });

      form.submissions.push(submission);
      await form.save();

      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  }
}
