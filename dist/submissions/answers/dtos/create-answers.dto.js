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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateAnswersInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const create_closed_answer_dto_1 = require("./create-answer/create-closed-answer.dto");
const create_grid_answer_dto_1 = require("./create-answer/create-grid-answer.dto");
const create_linear_answer_dto_1 = require("./create-answer/create-linear-answer.dto");
const create_opened_answer_dto_1 = require("./create-answer/create-opened-answer.dto");
const create_personal_answer_dto_1 = require("./create-answer/create-personal-answer.dto");
let CreateAnswersInput = class CreateAnswersInput {
};
__decorate([
    (0, graphql_1.Field)((type) => [create_opened_answer_dto_1.CreateOpenedAnswerInput], { nullable: true }),
    __metadata("design:type", Array)
], CreateAnswersInput.prototype, "opened", void 0);
__decorate([
    (0, graphql_1.Field)((type) => [create_closed_answer_dto_1.CreateClosedAnswerInput], { nullable: true }),
    __metadata("design:type", Array)
], CreateAnswersInput.prototype, "closed", void 0);
__decorate([
    (0, graphql_1.Field)((type) => [create_linear_answer_dto_1.CreateLinearAnswerInput], { nullable: true }),
    __metadata("design:type", Array)
], CreateAnswersInput.prototype, "linear", void 0);
__decorate([
    (0, graphql_1.Field)((type) => [create_grid_answer_dto_1.CreateGridAnswerInput], { nullable: true }),
    __metadata("design:type", Array)
], CreateAnswersInput.prototype, "grid", void 0);
__decorate([
    (0, graphql_1.Field)((type) => [create_personal_answer_dto_1.CreatePersonalAnswerInput], { nullable: true }),
    __metadata("design:type", Array)
], CreateAnswersInput.prototype, "personal", void 0);
CreateAnswersInput = __decorate([
    (0, graphql_1.InputType)()
], CreateAnswersInput);
exports.CreateAnswersInput = CreateAnswersInput;
//# sourceMappingURL=create-answers.dto.js.map