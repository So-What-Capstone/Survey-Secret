"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateClosedQuestionOutput = exports.CreateClosedQuestionInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const closed_question_schema_1 = require("../schemas/closed-question.schema");
const output_dto_1 = require("./../../common/dtos/output.dto");
let CreateClosedQuestionInput = class CreateClosedQuestionInput extends (0, graphql_1.PickType)(closed_question_schema_1.ClosedQuestion, [
    'content',
    'choices',
    'description',
    'required',
    'order',
    'type',
]) {
};
CreateClosedQuestionInput = __decorate([
    (0, graphql_1.InputType)()
], CreateClosedQuestionInput);
exports.CreateClosedQuestionInput = CreateClosedQuestionInput;
let CreateClosedQuestionOutput = class CreateClosedQuestionOutput extends output_dto_1.CoreOutput {
};
CreateClosedQuestionOutput = __decorate([
    (0, graphql_1.ObjectType)()
], CreateClosedQuestionOutput);
exports.CreateClosedQuestionOutput = CreateClosedQuestionOutput;
//# sourceMappingURL=create-closed-question.dto.js.map