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
exports.CreatePersonalQuestionOutput = exports.CreatePersonalQuestionInput = exports.CreatePersonalQuestionInputType = void 0;
const graphql_1 = require("@nestjs/graphql");
const personal_question_schema_1 = require("../schemas/personal-question.schema");
const output_dto_1 = require("../../../common/dtos/output.dto");
const common_create_question_dto_1 = require("./common-create-question.dto");
const question_typeDefs_1 = require("../question.typeDefs");
let CreatePersonalQuestionInputType = class CreatePersonalQuestionInputType extends (0, graphql_1.IntersectionType)(common_create_question_dto_1.CommonCreateQuestionInput, (0, graphql_1.PickType)(personal_question_schema_1.PersonalQuestion, ['type', 'encoded'])) {
};
CreatePersonalQuestionInputType = __decorate([
    (0, graphql_1.InputType)()
], CreatePersonalQuestionInputType);
exports.CreatePersonalQuestionInputType = CreatePersonalQuestionInputType;
let CreatePersonalQuestionInput = class CreatePersonalQuestionInput {
};
__decorate([
    (0, graphql_1.Field)((type) => CreatePersonalQuestionInputType),
    __metadata("design:type", CreatePersonalQuestionInputType)
], CreatePersonalQuestionInput.prototype, "question", void 0);
__decorate([
    (0, graphql_1.Field)((type) => question_typeDefs_1.QuestionType),
    __metadata("design:type", String)
], CreatePersonalQuestionInput.prototype, "type", void 0);
CreatePersonalQuestionInput = __decorate([
    (0, graphql_1.InputType)()
], CreatePersonalQuestionInput);
exports.CreatePersonalQuestionInput = CreatePersonalQuestionInput;
let CreatePersonalQuestionOutput = class CreatePersonalQuestionOutput extends output_dto_1.CoreOutput {
};
CreatePersonalQuestionOutput = __decorate([
    (0, graphql_1.ObjectType)()
], CreatePersonalQuestionOutput);
exports.CreatePersonalQuestionOutput = CreatePersonalQuestionOutput;
//# sourceMappingURL=create-personal-question.dto.js.map