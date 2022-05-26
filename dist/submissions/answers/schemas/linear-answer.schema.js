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
exports.LinearAnswerSchema = exports.LinearAnswer = void 0;
const graphql_1 = require("@nestjs/graphql");
const mongoose_1 = require("@nestjs/mongoose");
const answer_schema_1 = require("./answer.schema");
let LinearAnswer = class LinearAnswer extends answer_schema_1.Answer {
};
__decorate([
    (0, graphql_1.Field)((type) => Number),
    (0, mongoose_1.Prop)({ type: Number }),
    __metadata("design:type", Number)
], LinearAnswer.prototype, "no", void 0);
LinearAnswer = __decorate([
    (0, graphql_1.InputType)('LinearAnswerInputType', { isAbstract: true }),
    (0, graphql_1.ObjectType)()
], LinearAnswer);
exports.LinearAnswer = LinearAnswer;
exports.LinearAnswerSchema = mongoose_1.SchemaFactory.createForClass(LinearAnswer);
//# sourceMappingURL=linear-answer.schema.js.map