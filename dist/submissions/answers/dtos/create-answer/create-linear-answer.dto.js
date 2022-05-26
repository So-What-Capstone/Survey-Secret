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
exports.CreateLinearAnswerOutput = exports.CreateLinearAnswerInput = exports.CreateLinearAnswerInputType = void 0;
const graphql_1 = require("@nestjs/graphql");
const linear_answer_schema_1 = require("../../schemas/linear-answer.schema");
const output_dto_1 = require("../../../../common/dtos/output.dto");
const question_typeDefs_1 = require("../../../../forms/questions/question.typeDefs");
const common_create_answer_dto_1 = require("../common-create-answer.dto");
let CreateLinearAnswerInputType = class CreateLinearAnswerInputType extends (0, graphql_1.IntersectionType)((0, graphql_1.PickType)(linear_answer_schema_1.LinearAnswer, ['no']), common_create_answer_dto_1.CommonCreateAnswerInput) {
};
CreateLinearAnswerInputType = __decorate([
    (0, graphql_1.InputType)()
], CreateLinearAnswerInputType);
exports.CreateLinearAnswerInputType = CreateLinearAnswerInputType;
let CreateLinearAnswerInput = class CreateLinearAnswerInput {
};
__decorate([
    (0, graphql_1.Field)((type) => CreateLinearAnswerInputType),
    __metadata("design:type", CreateLinearAnswerInputType)
], CreateLinearAnswerInput.prototype, "answer", void 0);
__decorate([
    (0, graphql_1.Field)((type) => question_typeDefs_1.QuestionType),
    __metadata("design:type", String)
], CreateLinearAnswerInput.prototype, "type", void 0);
CreateLinearAnswerInput = __decorate([
    (0, graphql_1.InputType)()
], CreateLinearAnswerInput);
exports.CreateLinearAnswerInput = CreateLinearAnswerInput;
let CreateLinearAnswerOutput = class CreateLinearAnswerOutput extends output_dto_1.CoreOutput {
};
CreateLinearAnswerOutput = __decorate([
    (0, graphql_1.ObjectType)()
], CreateLinearAnswerOutput);
exports.CreateLinearAnswerOutput = CreateLinearAnswerOutput;
//# sourceMappingURL=create-linear-answer.dto.js.map