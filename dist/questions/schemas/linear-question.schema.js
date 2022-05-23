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
exports.LinearQuestionSchema = exports.LinearQuestion = void 0;
const graphql_1 = require("@nestjs/graphql");
const mongoose_1 = require("@nestjs/mongoose");
const option_schema_1 = require("../../common/schemas/option.schema");
const question_schema_1 = require("./question.schema");
let LinearQuestion = class LinearQuestion extends question_schema_1.Question {
};
__decorate([
    (0, graphql_1.Field)((type) => Number),
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], LinearQuestion.prototype, "leftRange", void 0);
__decorate([
    (0, graphql_1.Field)((type) => Number),
    (0, mongoose_1.Prop)({ type: Number, required: true }),
    __metadata("design:type", Number)
], LinearQuestion.prototype, "rightRange", void 0);
__decorate([
    (0, graphql_1.Field)((type) => String, { nullable: true }),
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], LinearQuestion.prototype, "leftLabel", void 0);
__decorate([
    (0, graphql_1.Field)((type) => String, { nullable: true }),
    (0, mongoose_1.Prop)({ type: String }),
    __metadata("design:type", String)
], LinearQuestion.prototype, "rightLabel", void 0);
LinearQuestion = __decorate([
    (0, graphql_1.InputType)('LinearQuestionInputType', { isAbstract: true }),
    (0, graphql_1.ObjectType)(),
    (0, mongoose_1.Schema)(option_schema_1.schemaOptionExceptDate)
], LinearQuestion);
exports.LinearQuestion = LinearQuestion;
exports.LinearQuestionSchema = mongoose_1.SchemaFactory.createForClass(LinearQuestion);
//# sourceMappingURL=linear-question.schema.js.map