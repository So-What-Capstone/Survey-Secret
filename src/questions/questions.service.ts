import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import {
  ClosedQuestion,
  ClosedQuestionDocument,
} from './schemas/closed-question.schema';
import { Model } from 'mongoose';
import {
  CreateClosedQuestionInput,
  CreateClosedQuestionOutput,
} from './dtos/create-closed-question.dto';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(ClosedQuestion.name)
    private readonly closedQuestionModel: Model<ClosedQuestionDocument>,
  ) {}

  async createClosedQuestion(
    createClosedQuestionInput: CreateClosedQuestionInput,
  ): Promise<CreateClosedQuestionOutput> {
    try {
      const closedQuestion = await this.closedQuestionModel.create(
        createClosedQuestionInput,
      );

      console.log(closedQuestion);

      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  }
}
