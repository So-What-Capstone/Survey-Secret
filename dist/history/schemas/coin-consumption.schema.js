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
exports.CoinChargeSchema = exports.CoinConsumption = exports.UsedForType = void 0;
const graphql_1 = require("@nestjs/graphql");
const mongoose_1 = require("@nestjs/mongoose");
const class_validator_1 = require("class-validator");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../../users/schemas/user.schema");
const core_schema_1 = require("./../../common/schemas/core.schema");
const option_schema_1 = require("./../../common/schemas/option.schema");
var UsedForType;
(function (UsedForType) {
    UsedForType["Email"] = "Email";
    UsedForType["Phone"] = "Phone";
})(UsedForType = exports.UsedForType || (exports.UsedForType = {}));
(0, graphql_1.registerEnumType)(UsedForType, { name: 'UsedForType' });
let CoinConsumption = class CoinConsumption extends core_schema_1.CoreSchema {
};
__decorate([
    (0, graphql_1.Field)((type) => Date),
    (0, mongoose_1.Prop)({
        type: Date,
        required: true
    }),
    __metadata("design:type", Date)
], CoinConsumption.prototype, "consumedAt", void 0);
__decorate([
    (0, graphql_1.Field)((type) => UsedForType),
    (0, mongoose_1.Prop)({
        type: String,
        enum: UsedForType,
        required: true
    }),
    (0, class_validator_1.IsEnum)(UsedForType),
    __metadata("design:type", String)
], CoinConsumption.prototype, "usedForType", void 0);
__decorate([
    (0, graphql_1.Field)((type) => Number),
    (0, mongoose_1.Prop)({
        type: Number,
        required: true
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CoinConsumption.prototype, "coinAmount", void 0);
__decorate([
    (0, graphql_1.Field)((type) => Number),
    (0, mongoose_1.Prop)({
        type: Number,
        required: true
    }),
    (0, class_validator_1.IsInt)(),
    __metadata("design:type", Number)
], CoinConsumption.prototype, "cashAmount", void 0);
__decorate([
    (0, graphql_1.Field)((type) => user_schema_1.User),
    (0, mongoose_1.Prop)({ type: mongoose_2.default.Schema.Types.ObjectId, ref: 'User', required: true }),
    __metadata("design:type", user_schema_1.User)
], CoinConsumption.prototype, "owner", void 0);
CoinConsumption = __decorate([
    (0, graphql_1.InputType)('CoinConsumptionInput', { isAbstract: true }),
    (0, graphql_1.ObjectType)(),
    (0, mongoose_1.Schema)(option_schema_1.schemaOption)
], CoinConsumption);
exports.CoinConsumption = CoinConsumption;
exports.CoinChargeSchema = mongoose_1.SchemaFactory.createForClass(CoinConsumption);
//# sourceMappingURL=coin-consumption.schema.js.map