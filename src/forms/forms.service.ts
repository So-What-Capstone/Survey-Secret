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
import { DeleteFormOutput } from './dtos/delete-form.dto';
import {
  Submission,
  SubmissionDocument,
} from '../submissions/schemas/submission.schema';
import { EditFormOutput, EditFormInput } from './dtos/edit-form.dto';
import { CreateSectionInput } from './dtos/create-section.dto';

@Injectable()
export class FormsService {
  constructor(
    @InjectModel(Form.name) private readonly formModel: Model<FormDocument>,
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    @InjectModel(Submission.name)
    private readonly submissionModel: Model<SubmissionDocument>,
    @InjectConnection()
    private readonly connection: mongoose.Connection,
  ) {}

  //graphqlInput(opened,closed,....) to Mongo Entity(questions : [])
  preprocessSections(sectionInput: CreateSectionInput[]) {
    let sections = [];

    for (const {
      title,
      closed,
      opened,
      grid,
      linear,
      personal,
    } of sectionInput) {
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

    return sections;
  }

  async createForm(
    user: User,
    createFormInput: CreateFormInput,
  ): Promise<CreateFormOutput> {
    try {
      let sections = this.preprocessSections(createFormInput.sections);

      //Transaction(multi-document)
      const session = await this.connection.startSession();

      await session.withTransaction(async () => {
        const form = await this.formModel.create(
          [
            {
              title: createFormInput.title,
              description: createFormInput.description,
              sections,
              owner: user,
            },
          ],
          { session },
        );

        //if(not ~ ) : throw Exception

        await this.userModel.updateOne(
          { _id: user._id },
          { $push: { forms: form } },
          { session },
        );
      });
      await session.endSession();

      return { ok: true };
    } catch (error) {
      console.error(error);
      return { ok: false, error: error.message };
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

  async deleteForm(owner: User, formId: string): Promise<DeleteFormOutput> {
    try {
      const session = await this.connection.startSession();

      await session.withTransaction(async () => {
        const form = await this.formModel.findOneAndDelete(
          { _id: formId },
          { session },
        );

        if (!form) {
          throw new Error('폼을 찾을 수 없습니다.');
        }

        if (form.owner._id.toString() !== owner._id.toString()) {
          throw new Error('권한이 없습니다.');
        }

        //owner의 소유 forms에서 제거

        const deleteSubmissions = await this.submissionModel.deleteMany(
          { form: formId },
          { session },
        );
        const deleteFormInUser = await this.userModel.updateOne(
          { _id: owner._id },
          { $pull: { forms: formId } },
          { session },
        );

        Promise.all([deleteSubmissions, deleteFormInUser]);
      });
      await session.endSession();

      return { ok: true };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  async editForm(
    owner: User,
    { formId, title, description, sections: sectionInput }: EditFormInput,
  ): Promise<EditFormOutput> {
    try {
      //변수명 고치기
      let sections;
      if (sectionInput) {
        sections = this.preprocessSections(sectionInput);
      }

      //title, description, sections
      let form = await this.formModel.findOne({ _id: formId });

      if (!form) {
        throw new Error('폼을 찾을 수 없습니다.');
      }

      if (form.owner._id.toString() !== owner._id.toString()) {
        throw new Error('권한이 없습니다.');
      }

      await this.formModel.updateOne(
        { _id: formId },
        {
          $set: {
            sections: sectionInput ? sections : undefined,
            title: title ? title : undefined,
            description: description ? description : undefined,
          },
        },
      );

      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  }
}
