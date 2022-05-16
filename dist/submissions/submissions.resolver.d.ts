import { CreateSubmissionOutput, CreateSubmissionInput } from './dtos/create-submission.dto';
import { SubmissionsService } from './submissions.service';
export declare class SubmissionsResolver {
    private readonly submissionsService;
    constructor(submissionsService: SubmissionsService);
    createSubmission(createSubmissionInput: CreateSubmissionInput): Promise<CreateSubmissionOutput>;
}
