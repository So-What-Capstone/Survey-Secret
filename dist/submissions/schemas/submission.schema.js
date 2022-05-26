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
exports.SubmissionSchema = exports.Submission = void 0;
const graphql_1 = require("@nestjs/graphql");
const graphql_2 = require("@nestjs/graphql");
const mongoose_1 = require("@nestjs/mongoose");
const core_schema_1 = require("./../../common/schemas/core.schema");
const option_schema_1 = require("./../../common/schemas/option.schema");
const user_schema_1 = require("../../users/schemas/user.schema");
const mongoose_2 = require("mongoose");
const form_schema_1 = require("./../../forms/schemas/form.schema");
const answer_typeDefs_1 = require("../answers/answer.typeDefs");
let Submission = class Submission extends core_schema_1.CoreSchema {
};
__decorate([
    (0, graphql_1.Field)((type) => user_schema_1.User, { nullable: true }),
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", user_schema_1.User)
], Submission.prototype, "respondent", void 0);
__decorate([
    (0, graphql_1.Field)((type) => form_schema_1.Form),
    (0, mongoose_1.Prop)({
        type: mongoose_2.default.Schema.Types.ObjectId,
        ref: 'Form',
        required: true,
    }),
    __metadata("design:type", form_schema_1.Form)
], Submission.prototype, "form", void 0);
__decorate([
    (0, graphql_1.Field)((type) => [answer_typeDefs_1.AnswerUnionType], { nullable: true }),
    (0, mongoose_1.Prop)({}),
    __metadata("design:type", Array)
], Submission.prototype, "answers", void 0);
Submission = __decorate([
    (0, graphql_1.InputType)('SubmissionInputType', { isAbstract: true }),
    (0, graphql_2.ObjectType)(),
    (0, mongoose_1.Schema)(option_schema_1.schemaOption)
], Submission);
exports.Submission = Submission;
exports.SubmissionSchema = mongoose_1.SchemaFactory.createForClass(Submission);
//# sourceMappingURL=submission.schema.js.map