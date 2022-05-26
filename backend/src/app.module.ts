import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
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
import { AuthModule } from './auth/auth.module';
import { MailsModule } from './mails/mails.module';
import { SubmissionsModule } from './submissions/submissions.module';
import { graphqlUploadExpress } from 'graphql-upload';
import { UploaderModule } from './uploader/uploader.module';
import { StatModule } from './stat/stat.module';
import { SmsModule } from './sms/sms.module';

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
        AWS_KEY: Joi.string().required(),
        AWS_SECRET: Joi.string().required(),
        SMS_USER_ID: Joi.string().required(),
        SMS_API_KEY: Joi.string().required(),
      }),
    }),
    //set DB logger(raw query), DB error/connect log
    MongooseModule.forRoot(process.env.DB_URL),

    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      context: ({ req }) => {
        return { token: req.headers['x-jwt'] };
      },
    }),

    UsersModule,
    FormsModule,
    AuthModule,
    MailsModule.forRoot({
      apiKey: process.env.MAIL_API_KEY,
      fromEmail: process.env.MAIL_FROM_EMAIL,
      domain: process.env.MAIL_DOMAIN,
    }),
    SmsModule.forRoot({
      key: process.env.SMS_API_KEY,
      user_id: process.env.SMS_USER_ID,
    }),
    SubmissionsModule,
    UploaderModule,
    StatModule,
    SmsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(graphqlUploadExpress()).forRoutes('graphql');
  }
}
