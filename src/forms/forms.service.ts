import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Form, FormDocument } from './schemas/form.schema';
import { Model } from 'mongoose';
import { CreateFormInput, CreateFormOutput } from './dtos/craete-form.dto';
import { User } from '../users/schemas/user.schema';
import { UserDocument } from '../users/schemas/user.schema';
import {
  CreateSectionInput,
  CreateSectionOutput,
} from './dtos/create-section.dto';
import { Section, SectionDocument } from './schemas/section.schema';
import { FindSectionByIdOutput } from './dtos/find-section-by-id';
import { ClosedQuestion } from 'src/questions/schemas/closed-question.schema';
import { QuestionType } from 'src/questions/question.typeDefs';

@Injectable()
export class FormsService {
  constructor(
    @InjectModel(Form.name) private readonly formModel: Model<FormDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Section.name)
    private readonly sectionModel: Model<SectionDocument>,
  ) {}

  async createForm(
    createFormInput: CreateFormInput,
  ): Promise<CreateFormOutput> {
    try {
      //testing user, 나중에는 로그인한 유저를 넣을 것
      const user = await this.userModel.findOne({ username: 'a' });

      const form = await this.formModel.create({
        ...createFormInput,
        owner: user,
      });

      user.forms.push(form);
      await user.save();

      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async createSection({
    formId,
    order,
    title,
  }: CreateSectionInput): Promise<CreateSectionOutput> {
    try {
      const form = await this.formModel.findOne({ _id: formId });

      const section = await this.sectionModel.create({
        title,
        form,
        order,
      });

      form.sections.push(section);
      await form.save();

      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async findSectionById(sectionId: string): Promise<FindSectionByIdOutput> {
    try {
      const section = await this.sectionModel
        .findOne({ _id: sectionId })
        .populate('questions.question');

      if (!section) {
        return { ok: false, error: '섹션을 찾을 수 없습니다.' };
      }

      return { ok: true, section };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async findSectionByIdAndUpdateQuestions(
    sectionId: string,
    question: QuestionType,
  ) {
    try {
      const section = await this.sectionModel.findOneAndUpdate(
        { _id: sectionId },
        { $push: { questions: question } },
      );
      if (!section) {
        return { ok: false, error: '섹션을 찾을 수 없습니다.' };
      }

      return { ok: true, section };
    } catch (error) {
      return { ok: false, error };
    }
  }
}
