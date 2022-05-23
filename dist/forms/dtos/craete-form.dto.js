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
exports.CreateFormOutput = exports.CreateFormInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const form_schema_1 = require("../schemas/form.schema");
const output_dto_1 = require("./../../common/dtos/output.dto");
const create_section_dto_1 = require("./create-section.dto");
let CreateFormInput = class CreateFormInput extends (0, graphql_1.PickType)(form_schema_1.Form, ['title', 'description']) {
};
__decorate([
    (0, graphql_1.Field)((type) => [create_section_dto_1.CreateSectionInput], { nullable: true }),
    __metadata("design:type", Array)
], CreateFormInput.prototype, "sections", void 0);
CreateFormInput = __decorate([
    (0, graphql_1.InputType)()
], CreateFormInput);
exports.CreateFormInput = CreateFormInput;
let CreateFormOutput = class CreateFormOutput extends output_dto_1.CoreOutput {
};
CreateFormOutput = __decorate([
    (0, graphql_1.ObjectType)()
], CreateFormOutput);
exports.CreateFormOutput = CreateFormOutput;
//# sourceMappingURL=craete-form.dto.js.map