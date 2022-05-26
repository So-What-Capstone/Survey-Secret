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
exports.QuestionsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const create_closed_question_dto_1 = require("./dtos/create-closed-question.dto");
const create_grid_question_dto_1 = require("./dtos/create-grid-question.dto");
const create_linear_question_dto_1 = require("./dtos/create-linear-question.dto");
const create_opened_question_dto_1 = require("./dtos/create-opened-question.dto");
const create_personal_question_dto_1 = require("./dtos/create-personal-question.dto");
const questions_service_1 = require("./questions.service");
let QuestionsResolver = class QuestionsResolver {
    constructor(questionsService) {
        this.questionsService = questionsService;
    }
    createClosedQuestion(createClosedQuestionInput) {
        return this.questionsService.createClosedQuestion(createClosedQuestionInput);
    }
    createOpenedQuestion(createOpenedQuestionInput) {
        return this.questionsService.createOpenedQuestion(createOpenedQuestionInput);
    }
    createLinearQuestion(createLinearQuestionInput) {
        return this.questionsService.createLinearQuestion(createLinearQuestionInput);
    }
    createGridQuestion(createGridQuestionInput) {
        return this.questionsService.createGridQuestion(createGridQuestionInput);
    }
    createPersonalQuestion(createPersonalQuestionInput) {
        return this.questionsService.createPersonalQuestion(createPersonalQuestionInput);
    }
};
__decorate([
    (0, graphql_1.Mutation)((returns) => create_closed_question_dto_1.CreateClosedQuestionOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_closed_question_dto_1.CreateClosedQuestionInput]),
    __metadata("design:returntype", Promise)
], QuestionsResolver.prototype, "createClosedQuestion", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => create_opened_question_dto_1.CreateOpenedQuestionOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_opened_question_dto_1.CreateOpenedQuestionInput]),
    __metadata("design:returntype", Promise)
], QuestionsResolver.prototype, "createOpenedQuestion", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => create_linear_question_dto_1.CreateLinearQuestionOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_linear_question_dto_1.CreateLinearQuestionInput]),
    __metadata("design:returntype", Promise)
], QuestionsResolver.prototype, "createLinearQuestion", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => create_grid_question_dto_1.CreateGridQuestionOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_grid_question_dto_1.CreateGridQuestionInput]),
    __metadata("design:returntype", Promise)
], QuestionsResolver.prototype, "createGridQuestion", null);
__decorate([
    (0, graphql_1.Mutation)((returns) => create_personal_question_dto_1.CreatePersonalQuestionOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_personal_question_dto_1.CreatePersonalQuestionInput]),
    __metadata("design:returntype", Promise)
], QuestionsResolver.prototype, "createPersonalQuestion", null);
QuestionsResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [questions_service_1.QuestionsService])
], QuestionsResolver);
exports.QuestionsResolver = QuestionsResolver;
//# sourceMappingURL=questions.resolver.js.map