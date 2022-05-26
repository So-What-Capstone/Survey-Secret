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
exports.ClosedQuestionSchema = exports.ClosedQuestion = exports.ClosedQuestionChoiceType = exports.ClosedQuestionType = void 0;
const graphql_1 = require("@nestjs/graphql");
const mongoose_1 = require("@nestjs/mongoose");
const option_schema_1 = require("../../common/schemas/option.schema");
const question_schema_1 = require("./question.schema");
var ClosedQuestionType;
(function (ClosedQuestionType) {
    ClosedQuestionType["One"] = "One";
    ClosedQuestionType["Multiple"] = "Multiple";
})(ClosedQuestionType = exports.ClosedQuestionType || (exports.ClosedQuestionType = {}));
(0, graphql_1.registerEnumType)(ClosedQuestionType, { name: 'ClosedQuestionType' });
let ClosedQuestionChoiceType = class ClosedQuestionChoiceType {
};
__decorate([
    (0, graphql_1.Field)((type) => Number),
    __metadata("design:type", Number)
], ClosedQuestionChoiceType.prototype, "no", void 0);
__decorate([
    (0, graphql_1.Field)((type) => String),
    __metadata("design:type", String)
], ClosedQuestionChoiceType.prototype, "choice", void 0);
ClosedQuestionChoiceType = __decorate([
    (0, graphql_1.InputType)('ClosedQuestionChoiceTypeInput', { isAbstract: true }),
    (0, graphql_1.ObjectType)()
], ClosedQuestionChoiceType);
exports.ClosedQuestionChoiceType = ClosedQuestionChoiceType;
let ClosedQuestion = class ClosedQuestion extends question_schema_1.Question {
};
__decorate([
    (0, graphql_1.Field)((type) => [ClosedQuestionChoiceType]),
    (0, mongoose_1.Prop)({
        type: [
            {
                no: { type: Number, unique: true },
                choice: { type: String },
            },
        ],
        required: true,
    }),
    __metadata("design:type", Array)
], ClosedQuestion.prototype, "choices", void 0);
__decorate([
    (0, graphql_1.Field)((type) => ClosedQuestionType, { nullable: true }),
    (0, mongoose_1.Prop)({
        type: String,
        enum: ClosedQuestionType,
        default: ClosedQuestionType.One,
        required: true,
    }),
    __metadata("design:type", String)
], ClosedQuestion.prototype, "type", void 0);
ClosedQuestion = __decorate([
    (0, graphql_1.InputType)('ClosedQuestionInputType', { isAbstract: true }),
    (0, graphql_1.ObjectType)(),
    (0, mongoose_1.Schema)(option_schema_1.schemaOptionExceptDate)
], ClosedQuestion);
exports.ClosedQuestion = ClosedQuestion;
exports.ClosedQuestionSchema = mongoose_1.SchemaFactory.createForClass(ClosedQuestion);
//# sourceMappingURL=closed-question.schema.js.map