import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Submission, SubmissionDocument } from './schemas/submission.schema';
import { Model } from 'mongoose';
import {
  CreateSubmissionInput,
  CreateSubmissionOutput,
} from './dtos/create-submission.dto';
import { Form, FormDocument } from '../forms/schemas/form.schema';
import { FindSubmissionByIdOutput } from './dtos/find-submission-by-id.dto';

@Injectable()
export class SubmissionsService {
  constructor(
    @InjectModel(Submission.name)
    private readonly submissionModel: Model<SubmissionDocument>,
    @InjectModel(Form.name)
    private readonly formModel: Model<FormDocument>,
  ) {}

  async createSubmission(
    createSubmissionInput: CreateSubmissionInput,
  ): Promise<CreateSubmissionOutput> {
    try {
      const form = await this.formModel.findById(createSubmissionInput.formId);

      let answers = [];
      for (const {
        closed,
        opened,
        linear,
        grid,
        personal,
      } of createSubmissionInput.answers) {
        answers = [
          ...(closed ? closed : []),
          ...(opened ? opened : []),
          ...(linear ? linear : []),

          ...(grid ? grid : []),
          ...(personal ? personal : []),
        ];
      }

      const submission = await this.submissionModel.create({
        form,
        answers,
      });

      // // form.submissions.push(submission);
      // await form.save();

      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async findSubmissionById(id: string): Promise<FindSubmissionByIdOutput> {
    try {
      const submission = await this.submissionModel.findOne({ _id: id });

      //용도에 따라 다양하게 쓰기 위해, return에 submission이 없는지 체크후 사용
      // if (!submission) {
      //   return { ok: false, error: '없는 답변입니다.' };
      // }

      return { ok: true, submission };
    } catch (error) {
      return { ok: false, error };
    }
  }
}
