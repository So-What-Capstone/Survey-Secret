import { Logger, Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import * as Joi from 'joi';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { FormsModule } from './forms/forms.module';
import { QuestionsModule } from './forms/questions/questions.module';
import { AuthModule } from './auth/auth.module';
import { MailsModule } from './mails/mails.module';
import { SubmissionsModule } from './submissions/submissions.module';
import { AnswersModule } from './submissions/answers/answers.module';

@Module({
  imports: [
    ConfigModule.forRoot({
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

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }) => {
        return { token: req.headers['x-jwt'] };
      },
    }),

    UsersModule,
    //set DB logger(raw query), DB error/connect log
    MongooseModule.forRoot(process.env.DB_URL),
    FormsModule,
    QuestionsModule,
    AuthModule,
    MailsModule.forRoot({
      apiKey: process.env.MAIL_API_KEY,
      fromEmail: process.env.MAIL_FROM_EMAIL,
      domain: process.env.MAIL_DOMAIN,
    }),
    SubmissionsModule,
    AnswersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
