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
exports.CreateOpenedQuestionOutput = exports.CreateOpenedQuestionInput = exports.CreateOpenedQuestionInputType = void 0;
const graphql_1 = require("@nestjs/graphql");
const output_dto_1 = require("../../../common/dtos/output.dto");
const opened_question_schema_1 = require("../schemas/opened-question.schema");
const common_create_question_dto_1 = require("./common-create-question.dto");
const question_typeDefs_1 = require("../question.typeDefs");
let CreateOpenedQuestionInputType = class CreateOpenedQuestionInputType extends (0, graphql_1.IntersectionType)(common_create_question_dto_1.CommonCreateQuestionInput, (0, graphql_1.PickType)(opened_question_schema_1.OpenedQuestion, ['type'])) {
};
CreateOpenedQuestionInputType = __decorate([
    (0, graphql_1.InputType)()
], CreateOpenedQuestionInputType);
exports.CreateOpenedQuestionInputType = CreateOpenedQuestionInputType;
let CreateOpenedQuestionInput = class CreateOpenedQuestionInput {
};
__decorate([
    (0, graphql_1.Field)((type) => CreateOpenedQuestionInputType),
    __metadata("design:type", CreateOpenedQuestionInputType)
], CreateOpenedQuestionInput.prototype, "question", void 0);
__decorate([
    (0, graphql_1.Field)((type) => question_typeDefs_1.QuestionType),
    __metadata("design:type", String)
], CreateOpenedQuestionInput.prototype, "type", void 0);
CreateOpenedQuestionInput = __decorate([
    (0, graphql_1.InputType)()
], CreateOpenedQuestionInput);
exports.CreateOpenedQuestionInput = CreateOpenedQuestionInput;
let CreateOpenedQuestionOutput = class CreateOpenedQuestionOutput extends output_dto_1.CoreOutput {
};
CreateOpenedQuestionOutput = __decorate([
    (0, graphql_1.ObjectType)()
], CreateOpenedQuestionOutput);
exports.CreateOpenedQuestionOutput = CreateOpenedQuestionOutput;
//# sourceMappingURL=create-opened-question.dto.js.map