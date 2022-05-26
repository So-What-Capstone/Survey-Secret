import { CreateClosedQuestionInput, CreateClosedQuestionOutput } from './dtos/create-closed-question.dto';
import { CreateGridQuestionInput, CreateGridQuestionOutput } from './dtos/create-grid-question.dto';
import { CreateLinearQuestionInput, CreateLinearQuestionOutput } from './dtos/create-linear-question.dto';
import { CreateOpenedQuestionInput, CreateOpenedQuestionOutput } from './dtos/create-opened-question.dto';
import { CreatePersonalQuestionOutput, CreatePersonalQuestionInput } from './dtos/create-personal-question.dto';
import { QuestionsService } from './questions.service';
export declare class QuestionsResolver {
    private readonly questionsService;
    constructor(questionsService: QuestionsService);
    createClosedQuestion(createClosedQuestionInput: CreateClosedQuestionInput): Promise<CreateClosedQuestionOutput>;
    createOpenedQuestion(createOpenedQuestionInput: CreateOpenedQuestionInput): Promise<CreateOpenedQuestionOutput>;
    createLinearQuestion(createLinearQuestionInput: CreateLinearQuestionInput): Promise<CreateLinearQuestionOutput>;
    createGridQuestion(createGridQuestionInput: CreateGridQuestionInput): Promise<CreateGridQuestionOutput>;
    createPersonalQuestion(createPersonalQuestionInput: CreatePersonalQuestionInput): Promise<CreatePersonalQuestionOutput>;
}
