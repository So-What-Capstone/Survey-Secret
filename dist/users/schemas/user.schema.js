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
exports.UserSchema = exports.User = exports.UserType = void 0;
const graphql_1 = require("@nestjs/graphql");
const mongoose_1 = require("@nestjs/mongoose");
const class_validator_1 = require("class-validator");
const mongoose_2 = require("mongoose");
const form_schema_1 = require("../../forms/schemas/form.schema");
const core_schema_1 = require("./../../common/schemas/core.schema");
const option_schema_1 = require("./../../common/schemas/option.schema");
var UserType;
(function (UserType) {
    UserType["Free"] = "Free";
    UserType["Premium"] = "Premium";
    UserType["Admin"] = "Admin";
})(UserType = exports.UserType || (exports.UserType = {}));
(0, graphql_1.registerEnumType)(UserType, { name: 'UserType' });
let User = class User extends core_schema_1.CoreSchema {
};
__decorate([
    (0, graphql_1.Field)((type) => String),
    (0, mongoose_1.Prop)({ type: String, required: true, trim: true, maxlength: 20 }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], User.prototype, "username", void 0);
__decorate([
    (0, graphql_1.Field)((type) => String, { nullable: true }),
    (0, mongoose_1.Prop)({
        type: String,
        unique: true,
        sparse: true,
        default: null,
        match: /^[0-9]{11}$/,
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.Length)(11, 11),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], User.prototype, "phoneNum", void 0);
__decorate([
    (0, graphql_1.Field)((type) => String),
    (0, mongoose_1.Prop)({
        type: String,
        required: true,
        unique: true,
        trim: true,
        minlength: 5,
        maxlength: 30,
    }),
    (0, class_validator_1.IsEmail)(),
    (0, class_validator_1.Length)(5, 30),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)((type) => String),
    (0, mongoose_1.Prop)({ type: String, required: true }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, graphql_1.Field)((type) => UserType),
    (0, mongoose_1.Prop)({
        type: String,
        enum: UserType,
        required: true,
        default: UserType.Free,
    }),
    (0, class_validator_1.IsEnum)(UserType),
    __metadata("design:type", String)
], User.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)((type) => graphql_1.Int, { nullable: true }),
    (0, mongoose_1.Prop)({ type: Number, default: 0, required: true }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], User.prototype, "coin", void 0);
__decorate([
    (0, graphql_1.Field)((type) => String, { nullable: true }),
    (0, mongoose_1.Prop)({ type: String }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], User.prototype, "avatarImg", void 0);
__decorate([
    (0, graphql_1.Field)((type) => [form_schema_1.Form], { nullable: true }),
    (0, mongoose_1.Prop)({ type: [mongoose_2.default.Schema.Types.ObjectId], ref: 'Form' }),
    __metadata("design:type", Array)
], User.prototype, "forms", void 0);
__decorate([
    (0, graphql_1.Field)((type) => Boolean, { nullable: true }),
    (0, mongoose_1.Prop)({ type: Boolean, required: true, default: false }),
    __metadata("design:type", Boolean)
], User.prototype, "isVerified", void 0);
User = __decorate([
    (0, graphql_1.InputType)('UserInput', { isAbstract: true }),
    (0, graphql_1.ObjectType)(),
    (0, mongoose_1.Schema)(option_schema_1.schemaOption)
], User);
exports.User = User;
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
//# sourceMappingURL=user.schema.js.map