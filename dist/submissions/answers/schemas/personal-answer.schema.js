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
exports.PersonalAnswerSchema = exports.PersonalAnswer = void 0;
const graphql_1 = require("@nestjs/graphql");
const answer_schema_1 = require("./answer.schema");
const mongoose_1 = require("@nestjs/mongoose");
const graphql_2 = require("@nestjs/graphql");
let PersonalAnswer = class PersonalAnswer extends answer_schema_1.Answer {
};
__decorate([
    (0, graphql_2.Field)((type) => String, { nullable: true }),
    (0, mongoose_1.Prop)({ type: String, trim: true }),
    __metadata("design:type", String)
], PersonalAnswer.prototype, "content", void 0);
PersonalAnswer = __decorate([
    (0, graphql_1.InputType)('PersonalAnswerInputType', { isAbstract: true }),
    (0, graphql_1.ObjectType)()
], PersonalAnswer);
exports.PersonalAnswer = PersonalAnswer;
exports.PersonalAnswerSchema = mongoose_1.SchemaFactory.createForClass(PersonalAnswer);
//# sourceMappingURL=personal-answer.schema.js.map