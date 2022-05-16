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
exports.MailsService = void 0;
const common_1 = require("@nestjs/common");
const common_constants_1 = require("./../common/common.constants");
const FormData = require("form-data");
const mailgun_js_1 = require("mailgun.js");
let MailsService = class MailsService {
    constructor(options) {
        this.options = options;
    }
    async sendEmail(subject, to, template, emailVars) {
        try {
            const mailgun = new mailgun_js_1.default(FormData);
            const client = mailgun.client({
                username: 'api',
                key: this.options.apiKey,
            });
            const messageData = {
                from: `${this.options.fromEmail}@${this.options.domain}`,
                to,
                subject,
                template,
            };
            emailVars.forEach((emailVar) => (messageData[`v:${emailVar.key}`] = emailVar.value));
            await client.messages.create(this.options.domain, messageData);
        }
        catch (error) {
            console.error(error);
        }
    }
    async sendVerificationEmail(email, code) {
        await this.sendEmail('Verify your email', email, 'email_auth', [
            { key: 'code', value: code },
            { key: 'username', value: email },
        ]);
    }
};
MailsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, common_1.Inject)(common_constants_1.MAIL_CONFIG_OPTIONS)),
    __metadata("design:paramtypes", [Object])
], MailsService);
exports.MailsService = MailsService;
//# sourceMappingURL=mails.service.js.map