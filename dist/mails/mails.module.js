"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var MailsModule_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.MailsModule = void 0;
const common_1 = require("@nestjs/common");
const mails_service_1 = require("./mails.service");
const common_constants_1 = require("./../common/common.constants");
let MailsModule = MailsModule_1 = class MailsModule {
    static forRoot(options) {
        return {
            module: MailsModule_1,
            providers: [
                { provide: common_constants_1.MAIL_CONFIG_OPTIONS, useValue: options },
                mails_service_1.MailsService,
            ],
            exports: [mails_service_1.MailsService],
        };
    }
};
MailsModule = MailsModule_1 = __decorate([
    (0, common_1.Module)({}),
    (0, common_1.Global)()
], MailsModule);
exports.MailsModule = MailsModule;
//# sourceMappingURL=mails.module.js.map