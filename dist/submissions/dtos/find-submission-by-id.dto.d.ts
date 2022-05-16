import { Submission } from '../schemas/submission.schema';
import { CoreOutput } from './../../common/dtos/output.dto';
export declare class FindSubmissionByIdOutput extends CoreOutput {
    submission?: Submission;
}
