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
exports.GridQuestionSchema = exports.GridQuestion = exports.GridQuestionType = void 0;
const graphql_1 = require("@nestjs/graphql");
const mongoose_1 = require("@nestjs/mongoose");
const question_schema_1 = require("./question.schema");
const class_validator_1 = require("class-validator");
var GridQuestionType;
(function (GridQuestionType) {
    GridQuestionType["One"] = "One";
    GridQuestionType["Multiple"] = "Multiple";
})(GridQuestionType = exports.GridQuestionType || (exports.GridQuestionType = {}));
(0, graphql_1.registerEnumType)(GridQuestionType, { name: 'GridQuestionType' });
let GridQuestion = class GridQuestion extends question_schema_1.Question {
};
__decorate([
    (0, graphql_1.Field)((type) => [String], { nullable: true }),
    (0, mongoose_1.Prop)({ type: [{ type: String, trim: true }] }),
    __metadata("design:type", Array)
], GridQuestion.prototype, "rowContent", void 0);
__decorate([
    (0, graphql_1.Field)((type) => [String], { nullable: true }),
    (0, mongoose_1.Prop)({ type: [{ type: String, trim: true }] }),
    __metadata("design:type", Array)
], GridQuestion.prototype, "colContent", void 0);
__decorate([
    (0, graphql_1.Field)((type) => GridQuestionType, { nullable: true }),
    (0, mongoose_1.Prop)({
        type: String,
        enum: GridQuestionType,
        default: GridQuestionType.One,
        required: true,
    }),
    (0, class_validator_1.IsEnum)(GridQuestionType),
    __metadata("design:type", String)
], GridQuestion.prototype, "type", void 0);
GridQuestion = __decorate([
    (0, graphql_1.InputType)('GridQuestionInputType', { isAbstract: true }),
    (0, graphql_1.ObjectType)()
], GridQuestion);
exports.GridQuestion = GridQuestion;
exports.GridQuestionSchema = mongoose_1.SchemaFactory.createForClass(GridQuestion);
//# sourceMappingURL=grid-question.scheam.js.map