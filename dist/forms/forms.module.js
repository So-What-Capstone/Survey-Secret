"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FormsModule = void 0;
const common_1 = require("@nestjs/common");
const forms_service_1 = require("./forms.service");
const mongoose_1 = require("@nestjs/mongoose");
const form_schema_1 = require("./schemas/form.schema");
const user_schema_1 = require("../users/schemas/user.schema");
const forms_resolver_1 = require("./forms.resolver");
const section_schema_1 = require("./schemas/section.schema");
let FormsModule = class FormsModule {
};
FormsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: form_schema_1.Form.name,
                    schema: form_schema_1.FormSchema,
                },
                {
                    name: user_schema_1.User.name,
                    schema: user_schema_1.UserSchema,
                },
                {
                    name: section_schema_1.Section.name,
                    schema: section_schema_1.SectionSchema,
                },
            ]),
        ],
        providers: [forms_service_1.FormsService, forms_resolver_1.FormsResolver],
        exports: [forms_service_1.FormsService],
    })
], FormsModule);
exports.FormsModule = FormsModule;
//# sourceMappingURL=forms.module.js.map