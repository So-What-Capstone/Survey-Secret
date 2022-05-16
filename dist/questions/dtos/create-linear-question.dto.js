"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateLinearQuestionOutput = exports.CreateLinearQuestionInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const linear_question_schema_1 = require("../schemas/linear-question.schema");
const output_dto_1 = require("./../../common/dtos/output.dto");
let CreateLinearQuestionInput = class CreateLinearQuestionInput extends (0, graphql_1.PickType)(linear_question_schema_1.LinearQuestion, [
    'content',
    'leftLabel',
    'order',
    'rightLabel',
    'leftRange',
    'rightRange',
    'description',
    'required',
]) {
};
CreateLinearQuestionInput = __decorate([
    (0, graphql_1.InputType)()
], CreateLinearQuestionInput);
exports.CreateLinearQuestionInput = CreateLinearQuestionInput;
let CreateLinearQuestionOutput = class CreateLinearQuestionOutput extends output_dto_1.CoreOutput {
};
CreateLinearQuestionOutput = __decorate([
    (0, graphql_1.ObjectType)()
], CreateLinearQuestionOutput);
exports.CreateLinearQuestionOutput = CreateLinearQuestionOutput;
//# sourceMappingURL=create-linear-question.dto.js.map