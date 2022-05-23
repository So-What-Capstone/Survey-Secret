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
exports.FindSectionByIdOutput = exports.FindSectionByIdInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const section_schema_1 = require("../schemas/section.schema");
const output_dto_1 = require("../../common/dtos/output.dto");
let FindSectionByIdInput = class FindSectionByIdInput {
};
__decorate([
    (0, graphql_1.Field)((type) => String),
    __metadata("design:type", String)
], FindSectionByIdInput.prototype, "sectionId", void 0);
FindSectionByIdInput = __decorate([
    (0, graphql_1.InputType)()
], FindSectionByIdInput);
exports.FindSectionByIdInput = FindSectionByIdInput;
let FindSectionByIdOutput = class FindSectionByIdOutput extends output_dto_1.CoreOutput {
};
__decorate([
    (0, graphql_1.Field)((type) => section_schema_1.Section, { nullable: true }),
    __metadata("design:type", section_schema_1.Section)
], FindSectionByIdOutput.prototype, "section", void 0);
FindSectionByIdOutput = __decorate([
    (0, graphql_1.ObjectType)()
], FindSectionByIdOutput);
exports.FindSectionByIdOutput = FindSectionByIdOutput;
//# sourceMappingURL=find-section-by-id.js.map