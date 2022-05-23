"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AnswersModule = void 0;
const common_1 = require("@nestjs/common");
const answers_service_1 = require("./answers.service");
const answers_resolver_1 = require("./answers.resolver");
const submissions_module_1 = require("../submissions.module");
const questions_module_1 = require("../../forms/questions/questions.module");
let AnswersModule = class AnswersModule {
};
AnswersModule = __decorate([
    (0, common_1.Module)({
        imports: [submissions_module_1.SubmissionsModule, questions_module_1.QuestionsModule],
        providers: [answers_service_1.AnswersService, answers_resolver_1.AnswersResolver],
        exports: [answers_service_1.AnswersService],
    })
], AnswersModule);
exports.AnswersModule = AnswersModule;
//# sourceMappingURL=answers.module.js.map