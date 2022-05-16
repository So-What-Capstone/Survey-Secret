"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuestionsModule = void 0;
const common_1 = require("@nestjs/common");
const questions_service_1 = require("./questions.service");
const mongoose_1 = require("@nestjs/mongoose");
const questions_resolver_1 = require("./questions.resolver");
const closed_question_schema_1 = require("./schemas/closed-question.schema");
const section_schema_1 = require("../forms/schemas/section.schema");
const section_schema_2 = require("./../forms/schemas/section.schema");
const opened_question_schema_1 = require("./schemas/opened-question.schema");
const linear_question_schema_1 = require("./schemas/linear-question.schema");
const grid_question_scheam_1 = require("./schemas/grid-question.scheam");
const personal_question_schema_1 = require("./schemas/personal-question.schema");
let QuestionsModule = class QuestionsModule {
};
QuestionsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: closed_question_schema_1.ClosedQuestion.name,
                    schema: closed_question_schema_1.ClosedQuestionSchema,
                },
                {
                    name: opened_question_schema_1.OpenedQuestion.name,
                    schema: opened_question_schema_1.OpenedQuestionSchema,
                },
                {
                    name: linear_question_schema_1.LinearQuestion.name,
                    schema: linear_question_schema_1.LinearQuestionSchema,
                },
                {
                    name: grid_question_scheam_1.GridQuestion.name,
                    schema: grid_question_scheam_1.GridQuestionSchema,
                },
                {
                    name: personal_question_schema_1.PersonalQuestion.name,
                    schema: personal_question_schema_1.PersonalQuestionSchema,
                },
                {
                    name: section_schema_1.Section.name,
                    schema: section_schema_2.SectionSchema,
                },
            ]),
        ],
        providers: [questions_service_1.QuestionsService, questions_resolver_1.QuestionsResolver],
        exports: [questions_service_1.QuestionsService],
    })
], QuestionsModule);
exports.QuestionsModule = QuestionsModule;
//# sourceMappingURL=questions.module.js.map