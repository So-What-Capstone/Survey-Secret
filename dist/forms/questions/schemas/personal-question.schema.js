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
exports.PersonalQuestionSchema = exports.PersonalQuestion = exports.PersonalQuestionType = void 0;
const graphql_1 = require("@nestjs/graphql");
const mongoose_1 = require("@nestjs/mongoose");
const class_validator_1 = require("class-validator");
const question_schema_1 = require("./question.schema");
var PersonalQuestionType;
(function (PersonalQuestionType) {
    PersonalQuestionType["Phone"] = "Phone";
    PersonalQuestionType["Address"] = "Address";
    PersonalQuestionType["Email"] = "Email";
})(PersonalQuestionType = exports.PersonalQuestionType || (exports.PersonalQuestionType = {}));
(0, graphql_1.registerEnumType)(PersonalQuestionType, { name: 'PersonalQuestionType' });
let PersonalQuestion = class PersonalQuestion extends question_schema_1.Question {
};
__decorate([
    (0, graphql_1.Field)((type) => Boolean),
    (0, mongoose_1.Prop)({ type: Boolean, required: true, default: true }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], PersonalQuestion.prototype, "encoded", void 0);
__decorate([
    (0, graphql_1.Field)((type) => PersonalQuestionType),
    (0, mongoose_1.Prop)({ type: String, enum: PersonalQuestionType, required: true }),
    (0, class_validator_1.IsEnum)(PersonalQuestionType),
    __metadata("design:type", String)
], PersonalQuestion.prototype, "type", void 0);
PersonalQuestion = __decorate([
    (0, graphql_1.InputType)('PersonalQuestionInputType', { isAbstract: true }),
    (0, graphql_1.ObjectType)()
], PersonalQuestion);
exports.PersonalQuestion = PersonalQuestion;
exports.PersonalQuestionSchema = mongoose_1.SchemaFactory.createForClass(PersonalQuestion);
//# sourceMappingURL=personal-question.schema.js.map