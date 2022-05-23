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
exports.Question = void 0;
const graphql_1 = require("@nestjs/graphql");
const mongoose_1 = require("@nestjs/mongoose");
const class_validator_1 = require("class-validator");
let Question = class Question {
};
__decorate([
    (0, graphql_1.Field)((type) => String),
    (0, mongoose_1.Prop)({ type: String, trim: true, required: true, maxlength: 300 }),
    (0, class_validator_1.MaxLength)(300),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Question.prototype, "content", void 0);
__decorate([
    (0, graphql_1.Field)((type) => String, { nullable: true }),
    (0, mongoose_1.Prop)({ type: String, trim: true, maxlength: 300 }),
    (0, class_validator_1.MaxLength)(300),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Question.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)((type) => Boolean, { nullable: true }),
    (0, mongoose_1.Prop)({ type: Boolean, required: true, default: false }),
    (0, class_validator_1.IsBoolean)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Boolean)
], Question.prototype, "required", void 0);
__decorate([
    (0, graphql_1.Field)((type) => Number),
    (0, mongoose_1.Prop)({ type: Number, required: true, index: true }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], Question.prototype, "order", void 0);
Question = __decorate([
    (0, graphql_1.ObjectType)()
], Question);
exports.Question = Question;
//# sourceMappingURL=question.schema.js.map