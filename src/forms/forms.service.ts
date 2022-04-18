import { flatten, Injectable } from '@nestjs/common';
import { InjectConnection, InjectModel } from '@nestjs/mongoose';
import { Form, FormDocument, FormSchema } from './schemas/form.schema';
import { Model } from 'mongoose';
import { CreateFormInput, CreateFormOutput } from './dtos/craete-form.dto';
import { User } from '../users/schemas/user.schema';
import { UserDocument } from '../users/schemas/user.schema';
import { FindSectionByIdOutput } from './dtos/find-section-by-id.dto';
import mongoose from 'mongoose';
import { FIndFormByIdOutput } from './dtos/find-form-by-id.dto';

@Injectable()
export class FormsService {
  constructor(
    @InjectModel(Form.name) private readonly formModel: Model<FormDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectConnection()
    private readonly connection: mongoose.Connection,
  ) {}

  async createForm(
    user: User,
    createFormInput: CreateFormInput,
  ): Promise<CreateFormOutput> {
    try {
      let sections = [];

      for (const {
        title,
        closed,
        opened,
        grid,
        linear,
        personal,
      } of createFormInput.sections) {
        const questions = [
          ...(closed ? closed : []),
          ...(opened ? opened : []),
          ...(grid ? grid : []),
          ...(linear ? linear : []),
          ...(personal ? personal : []),
        ];

        // find more faster algorithm....
        // consider using DB middleware(before insert)
        questions.sort(
          ({ question: { order } }, { question: { order: order2 } }) => {
            return order - order2;
          },
        );

        const section = {
          title,
          questions,
        };
        sections.push(section);
      }

      //Transaction(multi-document)
      const session = await this.connection.startSession();

      await session.withTransaction(async () => {
        const form = await this.formModel.create({
          title: createFormInput.title,
          description: createFormInput.description,
          sections,
          owner: user,
        });

        //if(not ~ ) : throw Exception

        await this.userModel.updateOne(
          { _id: user._id },
          { $push: { forms: form } },
        );
      });
      session.endSession();

      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async findSectionById(sectionId: string): Promise<FindSectionByIdOutput> {
    try {
      const form = await this.formModel
        .findOne()
        .where('sections._id')
        .equals(sectionId)
        .select('sections');

      if (!form) {
        return { ok: false, error: '섹션을 찾을 수 없습니다.' };
      }

      const section = form.sections[0];

      return { ok: true, section };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async findFormById(formId: string): Promise<FIndFormByIdOutput> {
    try {
      //not for see result(submissions)
      const form = await this.formModel
        .findOne({ _id: formId })
        .populate('owner');

      if (!form) {
        return { ok: false, error: '폼을 찾을 수 없습니다.' };
      }

      return { ok: true, form };
    } catch (error) {
      return { ok: false, error };
    }
  }
}
