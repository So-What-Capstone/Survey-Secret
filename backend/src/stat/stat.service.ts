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
import { OpenedAnswer } from 'src/submissions/answers/schemas/opened-answer.schema';

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
      const formId = '62873f1dc03ea057158e8efa';
      const questionId = '62873f1dc03ea057158e8efc';

      const { submissions } = await this.formModel
        .findOne({
          _id: formId,
        })
        .populate('submissions');

      const answers = submissions.map((submission) => {
        const answer = submission.answers.find(
          (answer) =>
            answer.question.toString() === questionId &&
            answer.kind === 'Opened',
        ) as OpenedAnswer;
        return answer.content;
      });

      console.log(answers);

      //토큰화 이후, 빈도수 체크

      return { ok: true };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }
}
