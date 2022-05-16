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
exports.CreateClosedAnswerOutput = exports.CreateClosedAnswerInput = exports.CreateClosedAnswerInputType = void 0;
const graphql_1 = require("@nestjs/graphql");
const closed_answer_schema_1 = require("../../schemas/closed-answer.schema");
const output_dto_1 = require("../../../../common/dtos/output.dto");
const common_create_answer_dto_1 = require("../common-create-answer.dto");
const question_typeDefs_1 = require("../../../../forms/questions/question.typeDefs");
let CreateClosedAnswerInputType = class CreateClosedAnswerInputType extends (0, graphql_1.IntersectionType)((0, graphql_1.PickType)(closed_answer_schema_1.ClosedAnswer, ['no']), common_create_answer_dto_1.CommonCreateAnswerInput) {
};
CreateClosedAnswerInputType = __decorate([
    (0, graphql_1.InputType)()
], CreateClosedAnswerInputType);
exports.CreateClosedAnswerInputType = CreateClosedAnswerInputType;
let CreateClosedAnswerInput = class CreateClosedAnswerInput {
};
__decorate([
    (0, graphql_1.Field)((type) => CreateClosedAnswerInputType),
    __metadata("design:type", CreateClosedAnswerInputType)
], CreateClosedAnswerInput.prototype, "answer", void 0);
__decorate([
    (0, graphql_1.Field)((type) => question_typeDefs_1.QuestionType),
    __metadata("design:type", String)
], CreateClosedAnswerInput.prototype, "type", void 0);
CreateClosedAnswerInput = __decorate([
    (0, graphql_1.InputType)()
], CreateClosedAnswerInput);
exports.CreateClosedAnswerInput = CreateClosedAnswerInput;
let CreateClosedAnswerOutput = class CreateClosedAnswerOutput extends output_dto_1.CoreOutput {
};
CreateClosedAnswerOutput = __decorate([
    (0, graphql_1.ObjectType)()
], CreateClosedAnswerOutput);
exports.CreateClosedAnswerOutput = CreateClosedAnswerOutput;
//# sourceMappingURL=create-closed-answer.dto.js.map