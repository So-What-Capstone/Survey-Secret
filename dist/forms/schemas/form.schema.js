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
exports.FormSchema = exports.Form = exports.FormState = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const core_schema_1 = require("./../../common/schemas/core.schema");
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const user_schema_1 = require("../../users/schemas/user.schema");
const mongoose_2 = require("mongoose");
const option_schema_1 = require("./../../common/schemas/option.schema");
const section_schema_1 = require("./section.schema");
var FormState;
(function (FormState) {
    FormState["Ready"] = "Ready";
    FormState["Expired"] = "Expired";
})(FormState = exports.FormState || (exports.FormState = {}));
(0, graphql_1.registerEnumType)(FormState, { name: 'FormState' });
let Form = class Form extends core_schema_1.CoreSchema {
};
__decorate([
    (0, graphql_1.Field)((type) => String),
    __metadata("design:type", mongoose_2.default.Schema.Types.ObjectId)
], Form.prototype, "_id", void 0);
__decorate([
    (0, graphql_1.Field)((type) => String),
    (0, mongoose_1.Prop)({ type: String, required: true, trim: true, maxlength: 50 }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(50),
    __metadata("design:type", String)
], Form.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)((type) => String, { nullable: true }),
    (0, mongoose_1.Prop)({ type: String, maxlength: 300 }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(300),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], Form.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)((type) => FormState),
    (0, mongoose_1.Prop)({
        type: String,
        enum: FormState,
        required: true,
        default: FormState.Ready,
    }),
    (0, class_validator_1.IsEnum)(FormState),
    __metadata("design:type", String)
], Form.prototype, "state", void 0);
__decorate([
    (0, graphql_1.Field)((type) => Boolean),
    (0, mongoose_1.Prop)({ type: Boolean, default: false }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], Form.prototype, "isPromoted", void 0);
__decorate([
    (0, graphql_1.Field)((type) => Date, { nullable: true }),
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Form.prototype, "expiredAt", void 0);
__decorate([
    (0, graphql_1.Field)((type) => Date, { nullable: true }),
    (0, mongoose_1.Prop)({ type: Date }),
    __metadata("design:type", Date)
], Form.prototype, "privacyExpiredAt", void 0);
__decorate([
    (0, graphql_1.Field)((type) => user_schema_1.User),
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", user_schema_1.User)
], Form.prototype, "owner", void 0);
__decorate([
    (0, graphql_1.Field)((type) => [section_schema_1.Section], { nullable: true }),
    (0, mongoose_1.Prop)({ type: [section_schema_1.SectionSchema] }),
    __metadata("design:type", Array)
], Form.prototype, "sections", void 0);
Form = __decorate([
    (0, graphql_1.InputType)('FormInputType', { isAbstract: true }),
    (0, graphql_1.ObjectType)(),
    (0, mongoose_1.Schema)(option_schema_1.schemaOption)
], Form);
exports.Form = Form;
exports.FormSchema = mongoose_1.SchemaFactory.createForClass(Form);
//# sourceMappingURL=form.schema.js.map