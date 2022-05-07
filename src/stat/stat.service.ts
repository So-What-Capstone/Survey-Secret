import { Injectable } from '@nestjs/common';
import * as dfd from 'danfojs-node';
import { InjectModel } from '@nestjs/mongoose';
import {
  Submission,
  SubmissionDocument,
} from '../submissions/schemas/submission.schema';
import { Model } from 'mongoose';
import { CoreOutput } from './../common/dtos/output.dto';
import { Form, FormDocument } from './../forms/schemas/form.schema';

@Injectable()
export class StatService {
  constructor(
    @InjectModel(Submission.name)
    private readonly submissionModel: Model<SubmissionDocument>,
    @InjectModel(Form.name)
    private readonly formModel: Model<FormDocument>,
  ) {}

  async getStat(): Promise<CoreOutput> {
    try {
      const form = await this.formModel.findOne({
        _id: '62760e0f9e1ccb85c08145bb',
      });

      return { ok: true };
    } catch (error) {
      return { ok: false, error: error.msg };
    }
  }
}
