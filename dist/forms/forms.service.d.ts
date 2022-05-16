import { FormDocument } from './schemas/form.schema';
import { Model } from 'mongoose';
import { CreateFormInput, CreateFormOutput } from './dtos/craete-form.dto';
import { User } from '../users/schemas/user.schema';
import { UserDocument } from '../users/schemas/user.schema';
import { SectionDocument } from './schemas/section.schema';
import { FindSectionByIdOutput } from './dtos/find-section-by-id';
import mongoose from 'mongoose';
export declare class FormsService {
    private readonly formModel;
    private readonly userModel;
    private readonly sectionModel;
    private readonly connection;
    constructor(formModel: Model<FormDocument>, userModel: Model<UserDocument>, sectionModel: Model<SectionDocument>, connection: mongoose.Connection);
    createForm(user: User, createFormInput: CreateFormInput): Promise<CreateFormOutput>;
    findSectionById(sectionId: string): Promise<FindSectionByIdOutput>;
}
