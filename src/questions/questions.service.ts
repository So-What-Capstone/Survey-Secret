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
import {
  CreateOpenedQuestionOutput,
  CreateOpenedQuestionInput,
} from './dtos/create-opened-question.dto';
import {
  OpenedQuestion,
  OpenedQuestionDocument,
} from './schemas/opened-question.schema';
import {
  CreateLinearQuestionInput,
  CreateLinearQuestionOutput,
} from './dtos/create-linear-question.dto';
import {
  LinearQuestion,
  LinearQuestionDocument,
} from './schemas/linear-question.schema';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(ClosedQuestion.name)
    private readonly closedQuestionModel: Model<ClosedQuestionDocument>,
    @InjectModel(OpenedQuestion.name)
    private readonly openedQuestionModel: Model<OpenedQuestionDocument>,
    @InjectModel(LinearQuestion.name)
    private readonly linearQuestionModel: Model<LinearQuestionDocument>,
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

  async createOpenedQuestion(
    createOpenedQuestionInput: CreateOpenedQuestionInput,
  ): Promise<CreateOpenedQuestionOutput> {
    try {
      const openedQuestion = await this.openedQuestionModel.create(
        createOpenedQuestionInput,
      );

      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async createLinearQuestion(
    createLinearQuestionInput: CreateLinearQuestionInput,
  ): Promise<CreateLinearQuestionOutput> {
    try {
      const linearQuestion = await this.linearQuestionModel.create(
        createLinearQuestionInput,
      );
      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  }
}
