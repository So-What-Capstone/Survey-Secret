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
import {
  CreateGridQuestionInput,
  CreateGridQuestionOutput,
} from './dtos/create-grid-question.dto';
import {
  GridQuestion,
  GridQuestionDocument,
} from './schemas/grid-question.scheam';

import {
  CreatePersonalQuestionOutput,
  CreatePersonalQuestionInput,
} from './dtos/create-personal-question.dto';
import {
  PersonalQuestion,
  PersonalQuestionDocument,
} from './schemas/personal-question.schema';
import { Section, SectionDocument } from '../forms/schemas/section.schema';

@Injectable()
export class QuestionsService {
  constructor(
    @InjectModel(ClosedQuestion.name)
    private readonly closedQuestionModel: Model<ClosedQuestionDocument>,
    @InjectModel(OpenedQuestion.name)
    private readonly openedQuestionModel: Model<OpenedQuestionDocument>,
    @InjectModel(LinearQuestion.name)
    private readonly linearQuestionModel: Model<LinearQuestionDocument>,
    @InjectModel(GridQuestion.name)
    private readonly gridQuestionModel: Model<GridQuestionDocument>,
    @InjectModel(PersonalQuestion.name)
    private readonly personalQuestionModel: Model<PersonalQuestionDocument>,
    @InjectModel(Section.name)
    private readonly sectionModel: Model<SectionDocument>,
  ) {}

  async createClosedQuestion(
    createClosedQuestionInput: CreateClosedQuestionInput,
  ): Promise<CreateClosedQuestionOutput> {
    try {
      const section = await this.sectionModel
        .findOne({ _id: createClosedQuestionInput.sectionId })
        .populate('questions.question');

      if (!section) {
        return { ok: false, error: '섹션을 찾을 수 없습니다.' };
      }

      const closedQuestion = await this.closedQuestionModel.create({
        ...createClosedQuestionInput,
        section,
      });

      section.questions.push({
        question: closedQuestion,
        type: 'ClosedQuestion',
      });
      await section.save();

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

  async createGridQuestion(
    createGridQuestionInput: CreateGridQuestionInput,
  ): Promise<CreateGridQuestionOutput> {
    try {
      const gridQuestion = this.gridQuestionModel.create(
        createGridQuestionInput,
      );

      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async createPersonalQuestion(
    createPersonalQuestionInput: CreatePersonalQuestionInput,
  ): Promise<CreatePersonalQuestionOutput> {
    try {
      const PersonalQuestion = this.personalQuestionModel.create(
        createPersonalQuestionInput,
      );
      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  }
}
