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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormsResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const auth_user_decorator_1 = require("../auth/auth-user.decorator");
const type_decorator_1 = require("../auth/type.decorator");
const craete_form_dto_1 = require("./dtos/craete-form.dto");
const find_section_by_id_1 = require("./dtos/find-section-by-id");
const forms_service_1 = require("./forms.service");
const user_schema_1 = require("./../users/schemas/user.schema");
let FormsResolver = class FormsResolver {
    constructor(formsService) {
        this.formsService = formsService;
    }
    createForm(user, createFormInput) {
        return this.formsService.createForm(user, createFormInput);
    }
    findSectionById({ sectionId }) {
        return this.formsService.findSectionById(sectionId);
    }
};
__decorate([
    (0, graphql_1.Mutation)((returns) => craete_form_dto_1.CreateFormOutput),
    (0, type_decorator_1.Type)(['Free']),
    __param(0, (0, auth_user_decorator_1.AuthUser)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_schema_1.User,
        craete_form_dto_1.CreateFormInput]),
    __metadata("design:returntype", Promise)
], FormsResolver.prototype, "createForm", null);
__decorate([
    (0, graphql_1.Query)((returns) => find_section_by_id_1.FindSectionByIdOutput),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [find_section_by_id_1.FindSectionByIdInput]),
    __metadata("design:returntype", Promise)
], FormsResolver.prototype, "findSectionById", null);
FormsResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [forms_service_1.FormsService])
], FormsResolver);
exports.FormsResolver = FormsResolver;
//# sourceMappingURL=forms.resolver.js.map