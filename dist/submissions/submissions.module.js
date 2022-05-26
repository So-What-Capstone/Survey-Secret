"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubmissionsModule = void 0;
const common_1 = require("@nestjs/common");
const submissions_service_1 = require("./submissions.service");
const mongoose_1 = require("@nestjs/mongoose");
const submission_schema_1 = require("./schemas/submission.schema");
const submissions_resolver_1 = require("./submissions.resolver");
const form_schema_1 = require("./../forms/schemas/form.schema");
let SubmissionsModule = class SubmissionsModule {
};
SubmissionsModule = __decorate([
    (0, common_1.Module)({
        imports: [
            mongoose_1.MongooseModule.forFeature([
                {
                    name: submission_schema_1.Submission.name,
                    schema: submission_schema_1.SubmissionSchema,
                },
                {
                    name: form_schema_1.Form.name,
                    schema: form_schema_1.FormSchema,
                },
            ]),
        ],
        providers: [submissions_service_1.SubmissionsService, submissions_resolver_1.SubmissionsResolver],
        exports: [submissions_service_1.SubmissionsService],
    })
], SubmissionsModule);
exports.SubmissionsModule = SubmissionsModule;
//# sourceMappingURL=submissions.module.js.map