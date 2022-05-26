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
exports.SubmissionsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const submission_schema_1 = require("./schemas/submission.schema");
const mongoose_2 = require("mongoose");
const form_schema_1 = require("../forms/schemas/form.schema");
let SubmissionsService = class SubmissionsService {
    constructor(submissionModel, formModel) {
        this.submissionModel = submissionModel;
        this.formModel = formModel;
    }
    async createSubmission(createSubmissionInput) {
        try {
            const form = await this.formModel.findById(createSubmissionInput.formId);
            let answers = [];
            for (const { closed, opened, linear, grid, personal, } of createSubmissionInput.answers) {
                answers = [
                    ...(closed ? closed : []),
                    ...(opened ? opened : []),
                    ...(linear ? linear : []),
                    ...(grid ? grid : []),
                    ...(personal ? personal : []),
                ];
            }
            const submission = await this.submissionModel.create({
                form,
                answers,
            });
            return { ok: true };
        }
        catch (error) {
            return { ok: false, error };
        }
    }
    async findSubmissionById(id) {
        try {
            const submission = await this.submissionModel.findOne({ _id: id });
            return { ok: true, submission };
        }
        catch (error) {
            return { ok: false, error };
        }
    }
};
SubmissionsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(submission_schema_1.Submission.name)),
    __param(1, (0, mongoose_1.InjectModel)(form_schema_1.Form.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model])
], SubmissionsService);
exports.SubmissionsService = SubmissionsService;
//# sourceMappingURL=submissions.service.js.map