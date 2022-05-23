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
exports.CreateSectionOutput = exports.CreateSectionInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const create_grid_question_dto_1 = require("../questions/dtos/create-grid-question.dto");
const create_linear_question_dto_1 = require("../questions/dtos/create-linear-question.dto");
const create_personal_question_dto_1 = require("../questions/dtos/create-personal-question.dto");
const create_closed_question_dto_1 = require("../questions/dtos/create-closed-question.dto");
const create_opened_question_dto_1 = require("../questions/dtos/create-opened-question.dto");
const section_schema_1 = require("../schemas/section.schema");
const output_dto_1 = require("./../../common/dtos/output.dto");
let CreateSectionInput = class CreateSectionInput extends (0, graphql_1.PickType)(section_schema_1.Section, ['title']) {
};
__decorate([
    (0, graphql_1.Field)((type) => [create_opened_question_dto_1.CreateOpenedQuestionInput], { nullable: true }),
    __metadata("design:type", Array)
], CreateSectionInput.prototype, "opened", void 0);
__decorate([
    (0, graphql_1.Field)((type) => [create_closed_question_dto_1.CreateClosedQuestionInput], { nullable: true }),
    __metadata("design:type", Array)
], CreateSectionInput.prototype, "closed", void 0);
__decorate([
    (0, graphql_1.Field)((type) => [create_grid_question_dto_1.CreateGridQuestionInput], { nullable: true }),
    __metadata("design:type", Array)
], CreateSectionInput.prototype, "grid", void 0);
__decorate([
    (0, graphql_1.Field)((type) => [create_personal_question_dto_1.CreatePersonalQuestionInput], { nullable: true }),
    __metadata("design:type", Array)
], CreateSectionInput.prototype, "personal", void 0);
__decorate([
    (0, graphql_1.Field)((type) => [create_linear_question_dto_1.CreateLinearQuestionInput], { nullable: true }),
    __metadata("design:type", Array)
], CreateSectionInput.prototype, "linear", void 0);
CreateSectionInput = __decorate([
    (0, graphql_1.InputType)()
], CreateSectionInput);
exports.CreateSectionInput = CreateSectionInput;
let CreateSectionOutput = class CreateSectionOutput extends output_dto_1.CoreOutput {
};
CreateSectionOutput = __decorate([
    (0, graphql_1.ObjectType)()
], CreateSectionOutput);
exports.CreateSectionOutput = CreateSectionOutput;
//# sourceMappingURL=create-section.dto.js.map