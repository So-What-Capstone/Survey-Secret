import { SubmissionDocument } from './schemas/submission.schema';
import { Model } from 'mongoose';
import { CreateSubmissionInput, CreateSubmissionOutput } from './dtos/create-submission.dto';
import { FormDocument } from '../forms/schemas/form.schema';
import { FindSubmissionByIdOutput } from './dtos/find-submission-by-id.dto';
export declare class SubmissionsService {
    private readonly submissionModel;
    private readonly formModel;
    constructor(submissionModel: Model<SubmissionDocument>, formModel: Model<FormDocument>);
    createSubmission(createSubmissionInput: CreateSubmissionInput): Promise<CreateSubmissionOutput>;
    findSubmissionById(id: string): Promise<FindSubmissionByIdOutput>;
}
