"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const closed_question_schema_1 = require("./schemas/closed-question.schema");
const mongoose_2 = require("mongoose");
const opened_question_schema_1 = require("./schemas/opened-question.schema");
const linear_question_schema_1 = require("./schemas/linear-question.schema");
const grid_question_scheam_1 = require("./schemas/grid-question.scheam");
const personal_question_schema_1 = require("./schemas/personal-question.schema");
let QuestionsService = class QuestionsService {
    constructor(closedQuestionModel, openedQuestionModel, linearQuestionModel, gridQuestionModel, personalQuestionModel) {
        this.closedQuestionModel = closedQuestionModel;
        this.openedQuestionModel = openedQuestionModel;
        this.linearQuestionModel = linearQuestionModel;
        this.gridQuestionModel = gridQuestionModel;
        this.personalQuestionModel = personalQuestionModel;
    }
    async createClosedQuestion(createClosedQuestionInput) {
        try {
            const closedQuestion = await this.closedQuestionModel.create(createClosedQuestionInput);
            console.log(closedQuestion);
            return { ok: true };
        }
        catch (error) {
            return { ok: false, error };
        }
    }
    async createOpenedQuestion(createOpenedQuestionInput) {
        try {
            const openedQuestion = await this.openedQuestionModel.create(createOpenedQuestionInput);
            return { ok: true };
        }
        catch (error) {
            return { ok: false, error };
        }
    }
    async createLinearQuestion(createLinearQuestionInput) {
        try {
            const linearQuestion = await this.linearQuestionModel.create(createLinearQuestionInput);
            return { ok: true };
        }
        catch (error) {
            return { ok: false, error };
        }
    }
    async createGridQuestion(createGridQuestionInput) {
        try {
            const gridQuestion = this.gridQuestionModel.create(createGridQuestionInput);
            return { ok: true };
        }
        catch (error) {
            return { ok: false, error };
        }
    }
    async createPersonalQuestion(createPersonalQuestionInput) {
        try {
            const PersonalQuestion = this.personalQuestionModel.create(createPersonalQuestionInput);
            return { ok: true };
        }
        catch (error) {
            return { ok: false, error };
        }
    }
};
QuestionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(closed_question_schema_1.ClosedQuestion.name)),
    __param(1, (0, mongoose_1.InjectModel)(opened_question_schema_1.OpenedQuestion.name)),
    __param(2, (0, mongoose_1.InjectModel)(linear_question_schema_1.LinearQuestion.name)),
    __param(3, (0, mongoose_1.InjectModel)(grid_question_scheam_1.GridQuestion.name)),
    __param(4, (0, mongoose_1.InjectModel)(personal_question_schema_1.PersonalQuestion.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model])
], QuestionsService);
exports.QuestionsService = QuestionsService;
//# sourceMappingURL=questions.service.js.map