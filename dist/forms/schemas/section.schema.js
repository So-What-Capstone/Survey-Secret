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
exports.SectionSchema = exports.Section = void 0;
const graphql_1 = require("@nestjs/graphql");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const option_schema_1 = require("./../../common/schemas/option.schema");
const question_typeDefs_1 = require("../questions/question.typeDefs");
const class_validator_1 = require("class-validator");
let Section = class Section {
};
__decorate([
    (0, graphql_1.Field)((type) => String),
    __metadata("design:type", mongoose_2.default.Schema.Types.ObjectId)
], Section.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)((type) => String, { nullable: true }),
    (0, mongoose_1.Prop)({ type: String, required: true, trim: true, maxlength: 50 }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], Section.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)((type) => [question_typeDefs_1.QuestionUnionType], { nullable: true }),
    (0, mongoose_1.Prop)({}),
    __metadata("design:type", Array)
], Section.prototype, "questions", void 0);
Section = __decorate([
    (0, graphql_1.InputType)('SectionInputType', { isAbstract: true }),
    (0, graphql_1.ObjectType)(),
    (0, mongoose_1.Schema)(option_schema_1.schemaOptionExceptDate)
], Section);
exports.Section = Section;
exports.SectionSchema = mongoose_1.SchemaFactory.createForClass(Section);
//# sourceMappingURL=section.schema.js.map