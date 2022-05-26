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
exports.OpenedQuestionSchema = exports.OpenedQuestion = exports.OpenedQuestionType = void 0;
const graphql_1 = require("@nestjs/graphql");
const mongoose_1 = require("@nestjs/mongoose");
const class_validator_1 = require("class-validator");
const question_schema_1 = require("./question.schema");
var OpenedQuestionType;
(function (OpenedQuestionType) {
    OpenedQuestionType["Default"] = "Default";
    OpenedQuestionType["Date"] = "Date";
    OpenedQuestionType["Time"] = "Time";
    OpenedQuestionType["Address"] = "Address";
    OpenedQuestionType["File"] = "File";
})(OpenedQuestionType = exports.OpenedQuestionType || (exports.OpenedQuestionType = {}));
(0, graphql_1.registerEnumType)(OpenedQuestionType, { name: 'OpenedQuestionType' });
let OpenedQuestion = class OpenedQuestion extends question_schema_1.Question {
};
__decorate([
    (0, graphql_1.Field)((type) => OpenedQuestionType, { nullable: true }),
    (0, mongoose_1.Prop)({
        type: String,
        enum: OpenedQuestionType,
        default: OpenedQuestionType.Default,
        required: true,
    }),
    (0, class_validator_1.IsEnum)(OpenedQuestionType),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], OpenedQuestion.prototype, "type", void 0);
OpenedQuestion = __decorate([
    (0, graphql_1.InputType)('OpenedQuestionInputType', { isAbstract: true }),
    (0, graphql_1.ObjectType)()
], OpenedQuestion);
exports.OpenedQuestion = OpenedQuestion;
exports.OpenedQuestionSchema = mongoose_1.SchemaFactory.createForClass(OpenedQuestion);
//# sourceMappingURL=opened-question.schema.js.map