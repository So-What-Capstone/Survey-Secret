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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const user_schema_1 = require("../users/schemas/user.schema");
const mongoose_2 = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const mails_service_1 = require("./../mails/mails.service");
const verification_schema_1 = require("./schemas/verification.schema");
const uuid_1 = require("uuid");
let UsersService = class UsersService {
    constructor(userModel, mailsService, verificationModel) {
        this.userModel = userModel;
        this.mailsService = mailsService;
        this.verificationModel = verificationModel;
    }
    async createAccount({ username, email, password, phoneNum, }) {
        try {
            const existingUser = await this.userModel.findOne({
                email,
            });
            if (existingUser) {
                return { ok: false, error: '이미 사용중인 이메일입니다.' };
            }
            const user = await this.userModel.create({
                username,
                email,
                password: await bcrypt.hash(password, 10),
                phoneNum,
            });
            const verification = await this.verificationModel.create({
                code: (0, uuid_1.v4)(),
                user,
            });
            await this.mailsService.sendVerificationEmail(user.email, verification.code);
            return { ok: true };
        }
        catch (error) {
            return { ok: false, error };
        }
    }
    async login({ email, password }) {
        try {
            const user = await this.userModel.findOne({ email }, 'email password');
            if (!user) {
                return { ok: false, error: '이메일을 확인해주세요.' };
            }
            const isMatched = await bcrypt.compare(password, user.password);
            if (!isMatched) {
                return { ok: false, error: '비밀번호를 확인해주세요.' };
            }
            else {
                const token = jwt.sign(user._id.toString(), process.env.SECRET_KEY);
                console.log(token);
                return { ok: true, token };
            }
        }
        catch (error) {
            return { ok: false, error };
        }
    }
    async findById(id) {
        try {
            const user = await this.userModel.findById(id);
            if (!user) {
                return { ok: false, error: '유저를 찾을 수 없습니다.' };
            }
            return { ok: true, user };
            return { ok: true };
        }
        catch (error) {
            return { ok: false, error };
        }
    }
};
UsersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(user_schema_1.User.name)),
    __param(2, (0, mongoose_1.InjectModel)(verification_schema_1.Verification.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mails_service_1.MailsService,
        mongoose_2.Model])
], UsersService);
exports.UsersService = UsersService;
//# sourceMappingURL=users.service.js.map