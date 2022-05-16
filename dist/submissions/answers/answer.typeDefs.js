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
exports.AnswerUnionType = exports.AnswerUnion = void 0;
const question_typeDefs_1 = require("../../forms/questions/question.typeDefs");
const closed_answer_schema_1 = require("./schemas/closed-answer.schema");
const grid_answer_schema_1 = require("./schemas/grid-answer.schema");
const linear_answer_schema_1 = require("./schemas/linear-answer.schema");
const opened_answer_schema_1 = require("./schemas/opened-answer.schema");
const personal_answer_schema_1 = require("./schemas/personal-answer.schema");
const graphql_1 = require("@nestjs/graphql");
exports.AnswerUnion = (0, graphql_1.createUnionType)({
    name: 'AnswerUnion',
    types: () => [
        closed_answer_schema_1.ClosedAnswer,
        grid_answer_schema_1.GridAnswer,
        linear_answer_schema_1.LinearAnswer,
        opened_answer_schema_1.OpenedAnswer,
        personal_answer_schema_1.PersonalAnswer,
    ],
});
let AnswerUnionType = class AnswerUnionType {
};
__decorate([
    (0, graphql_1.Field)((type) => exports.AnswerUnion),
    __metadata("design:type", Object)
], AnswerUnionType.prototype, "answer", void 0);
__decorate([
    (0, graphql_1.Field)((type) => question_typeDefs_1.QuestionType),
    __metadata("design:type", String)
], AnswerUnionType.prototype, "type", void 0);
AnswerUnionType = __decorate([
    (0, graphql_1.ObjectType)()
], AnswerUnionType);
exports.AnswerUnionType = AnswerUnionType;
//# sourceMappingURL=answer.typeDefs.js.map