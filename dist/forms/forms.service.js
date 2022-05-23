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
exports.FormsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const form_schema_1 = require("./schemas/form.schema");
const mongoose_2 = require("mongoose");
const user_schema_1 = require("../users/schemas/user.schema");
const section_schema_1 = require("./schemas/section.schema");
const mongoose_3 = require("mongoose");
let FormsService = class FormsService {
    constructor(formModel, userModel, sectionModel, connection) {
        this.formModel = formModel;
        this.userModel = userModel;
        this.sectionModel = sectionModel;
        this.connection = connection;
    }
    async createForm(user, createFormInput) {
        try {
            let sections = [];
            for (const { title, closed, opened, grid, linear, personal, } of createFormInput.sections) {
                const questions = [
                    ...(closed ? closed : []),
                    ...(opened ? opened : []),
                    ...(grid ? grid : []),
                    ...(linear ? linear : []),
                    ...(personal ? personal : []),
                ];
                questions.sort(({ question: { order } }, { question: { order: order2 } }) => {
                    return order - order2;
                });
                const section = {
                    title,
                    questions,
                };
                sections.push(section);
            }
            const session = await this.connection.startSession();
            await session.withTransaction(async () => {
                const form = await this.formModel.create({
                    title: createFormInput.title,
                    description: createFormInput.description,
                    sections,
                    owner: user,
                });
                await this.userModel.updateOne({ _id: user._id }, { $push: { forms: form } });
            });
            session.endSession();
            return { ok: true };
        }
        catch (error) {
            return { ok: false, error };
        }
    }
    async findSectionById(sectionId) {
        try {
            const { sections } = await this.formModel
                .findOne()
                .where('sections._id')
                .equals(sectionId)
                .select('sections');
            const section = sections[0];
            if (!section) {
                return { ok: false, error: '섹션을 찾을 수 없습니다.' };
            }
            return { ok: true, section };
        }
        catch (error) {
            return { ok: false, error };
        }
    }
};
FormsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(form_schema_1.Form.name)),
    __param(1, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(2, (0, mongoose_1.InjectModel)(section_schema_1.Section.name)),
    __param(3, (0, mongoose_1.InjectConnection)()),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        mongoose_2.Model, mongoose_3.default.Connection])
], FormsService);
exports.FormsService = FormsService;
//# sourceMappingURL=forms.service.js.map