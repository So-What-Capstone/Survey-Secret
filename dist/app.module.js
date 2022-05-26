"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const users_module_1 = require("./users/users.module");
const config_1 = require("@nestjs/config");
const path_1 = require("path");
const Joi = require("joi");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const forms_module_1 = require("./forms/forms.module");
const questions_module_1 = require("./forms/questions/questions.module");
const auth_module_1 = require("./auth/auth.module");
const mails_module_1 = require("./mails/mails.module");
const submissions_module_1 = require("./submissions/submissions.module");
const answers_module_1 = require("./submissions/answers/answers.module");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                envFilePath: '.env',
                validationSchema: Joi.object({
                    DB_URL: Joi.string().required(),
                    PORT: Joi.string().required(),
                    MAIL_API_KEY: Joi.string().required(),
                    MAIL_FROM_EMAIL: Joi.string().required(),
                    MAIL_DOMAIN: Joi.string().required(),
                }),
            }),
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: (0, path_1.join)(process.cwd(), 'src/schema.gql'),
                context: ({ req }) => {
                    return { token: req.headers['x-jwt'] };
                },
            }),
            users_module_1.UsersModule,
            mongoose_1.MongooseModule.forRoot(process.env.DB_URL),
            forms_module_1.FormsModule,
            questions_module_1.QuestionsModule,
            auth_module_1.AuthModule,
            mails_module_1.MailsModule.forRoot({
                apiKey: process.env.MAIL_API_KEY,
                fromEmail: process.env.MAIL_FROM_EMAIL,
                domain: process.env.MAIL_DOMAIN,
            }),
            submissions_module_1.SubmissionsModule,
            answers_module_1.AnswersModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map