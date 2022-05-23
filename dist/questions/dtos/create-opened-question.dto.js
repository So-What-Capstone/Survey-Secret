"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateOpenedQuestionOutput = exports.CreateOpenedQuestionInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const output_dto_1 = require("./../../common/dtos/output.dto");
const opened_question_schema_1 = require("./../schemas/opened-question.schema");
let CreateOpenedQuestionInput = class CreateOpenedQuestionInput extends (0, graphql_1.PickType)(opened_question_schema_1.OpenedQuestion, [
    'content',
    'description',
    'required',
    'order',
    'type',
]) {
};
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