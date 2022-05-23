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
exports.FindUserByIdOutput = exports.FindUserByIdInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_schema_1 = require("../schemas/user.schema");
const output_dto_1 = require("../../common/dtos/output.dto");
let FindUserByIdInput = class FindUserByIdInput {
};
__decorate([
    (0, graphql_1.Field)((type) => String),
    __metadata("design:type", String)
], FindUserByIdInput.prototype, "id", void 0);
FindUserByIdInput = __decorate([
    (0, graphql_1.InputType)()
], FindUserByIdInput);
exports.FindUserByIdInput = FindUserByIdInput;
let FindUserByIdOutput = class FindUserByIdOutput extends output_dto_1.CoreOutput {
};
__decorate([
    (0, graphql_1.Field)((type) => user_schema_1.User, { nullable: true }),
    __metadata("design:type", user_schema_1.User)
], FindUserByIdOutput.prototype, "user", void 0);
FindUserByIdOutput = __decorate([
    (0, graphql_1.ObjectType)()
], FindUserByIdOutput);
exports.FindUserByIdOutput = FindUserByIdOutput;
//# sourceMappingURL=find-user-by-id.dto.js.map