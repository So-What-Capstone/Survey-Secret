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
exports.CreatePersonalAnswerInput = exports.CreatePersonalAnswerInputType = void 0;
const graphql_1 = require("@nestjs/graphql");
const question_typeDefs_1 = require("../../../../forms/questions/question.typeDefs");
const common_create_answer_dto_1 = require("../common-create-answer.dto");
const personal_answer_schema_1 = require("../../schemas/personal-answer.schema");
let CreatePersonalAnswerInputType = class CreatePersonalAnswerInputType extends (0, graphql_1.IntersectionType)(common_create_answer_dto_1.CommonCreateAnswerInput, (0, graphql_1.PickType)(personal_answer_schema_1.PersonalAnswer, ['content'])) {
};
CreatePersonalAnswerInputType = __decorate([
    (0, graphql_1.InputType)()
], CreatePersonalAnswerInputType);
exports.CreatePersonalAnswerInputType = CreatePersonalAnswerInputType;
let CreatePersonalAnswerInput = class CreatePersonalAnswerInput {
};
__decorate([
    (0, graphql_1.Field)((type) => CreatePersonalAnswerInputType),
    __metadata("design:type", CreatePersonalAnswerInputType)
], CreatePersonalAnswerInput.prototype, "answer", void 0);
__decorate([
    (0, graphql_1.Field)((type) => question_typeDefs_1.QuestionType),
    __metadata("design:type", String)
], CreatePersonalAnswerInput.prototype, "type", void 0);
CreatePersonalAnswerInput = __decorate([
    (0, graphql_1.InputType)()
], CreatePersonalAnswerInput);
exports.CreatePersonalAnswerInput = CreatePersonalAnswerInput;
//# sourceMappingURL=create-personal-answer.dto.js.map