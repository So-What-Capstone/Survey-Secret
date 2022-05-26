"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommonCreateQuestionInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const question_schema_1 = require("../schemas/question.schema");
let CommonCreateQuestionInput = class CommonCreateQuestionInput extends (0, graphql_1.PickType)(question_schema_1.Question, [
    'content',
    'description',
    'required',
    'order',
]) {
};
CommonCreateQuestionInput = __decorate([
    (0, graphql_1.InputType)()
], CommonCreateQuestionInput);
exports.CommonCreateQuestionInput = CommonCreateQuestionInput;
//# sourceMappingURL=common-create-question.dto.js.map