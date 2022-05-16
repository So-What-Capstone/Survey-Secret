import { ClosedQuestionDocument } from './schemas/closed-question.schema';
import { Model } from 'mongoose';
import { CreateClosedQuestionInput, CreateClosedQuestionOutput } from './dtos/create-closed-question.dto';
import { CreateOpenedQuestionOutput, CreateOpenedQuestionInput } from './dtos/create-opened-question.dto';
import { OpenedQuestionDocument } from './schemas/opened-question.schema';
import { CreateLinearQuestionInput, CreateLinearQuestionOutput } from './dtos/create-linear-question.dto';
import { LinearQuestionDocument } from './schemas/linear-question.schema';
import { CreateGridQuestionInput, CreateGridQuestionOutput } from './dtos/create-grid-question.dto';
import { GridQuestionDocument } from './schemas/grid-question.scheam';
import { CreatePersonalQuestionOutput, CreatePersonalQuestionInput } from './dtos/create-personal-question.dto';
import { PersonalQuestionDocument } from './schemas/personal-question.schema';
export declare class QuestionsService {
    private readonly closedQuestionModel;
    private readonly openedQuestionModel;
    private readonly linearQuestionModel;
    private readonly gridQuestionModel;
    private readonly personalQuestionModel;
    constructor(closedQuestionModel: Model<ClosedQuestionDocument>, openedQuestionModel: Model<OpenedQuestionDocument>, linearQuestionModel: Model<LinearQuestionDocument>, gridQuestionModel: Model<GridQuestionDocument>, personalQuestionModel: Model<PersonalQuestionDocument>);
    createClosedQuestion(createClosedQuestionInput: CreateClosedQuestionInput): Promise<CreateClosedQuestionOutput>;
    createOpenedQuestion(createOpenedQuestionInput: CreateOpenedQuestionInput): Promise<CreateOpenedQuestionOutput>;
    createLinearQuestion(createLinearQuestionInput: CreateLinearQuestionInput): Promise<CreateLinearQuestionOutput>;
    createGridQuestion(createGridQuestionInput: CreateGridQuestionInput): Promise<CreateGridQuestionOutput>;
    createPersonalQuestion(createPersonalQuestionInput: CreatePersonalQuestionInput): Promise<CreatePersonalQuestionOutput>;
}
