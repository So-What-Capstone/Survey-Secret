import { CreateAnswersInput } from '../answers/dtos/create-answers.dto';
import { CoreOutput } from './../../common/dtos/output.dto';
export declare class CreateSubmissionInput {
    formId: string;
    answers?: CreateAnswersInput[];
}
export declare class CreateSubmissionOutput extends CoreOutput {
}
