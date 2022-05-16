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
exports.VerificationSchema = exports.Verification = void 0;
const graphql_1 = require("@nestjs/graphql");
const mongoose_1 = require("@nestjs/mongoose");
const class_validator_1 = require("class-validator");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("./user.schema");
const option_schema_1 = require("../../common/schemas/option.schema");
const core_schema_1 = require("./../../common/schemas/core.schema");
let Verification = class Verification extends core_schema_1.CoreSchema {
};
__decorate([
    (0, graphql_1.Field)((type) => String),
    (0, mongoose_1.Prop)({ type: String, required: true }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], Verification.prototype, "code", void 0);
__decorate([
    (0, graphql_1.Field)((type) => user_schema_1.User),
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'User' }),
    __metadata("design:type", user_schema_1.User)
], Verification.prototype, "user", void 0);
Verification = __decorate([
    (0, graphql_1.InputType)({ isAbstract: true }),
    (0, graphql_1.ObjectType)(),
    (0, mongoose_1.Schema)(option_schema_1.schemaOption)
], Verification);
exports.Verification = Verification;
exports.VerificationSchema = mongoose_1.SchemaFactory.createForClass(Verification);
//# sourceMappingURL=verification.schema.js.map