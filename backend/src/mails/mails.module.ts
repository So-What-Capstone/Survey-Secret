import { DynamicModule, Global, Module } from '@nestjs/common';
import { MailsService } from './mails.service';
import { MAIL_CONFIG_OPTIONS } from './../common/common.constants';
import { MailsModuleOptions } from './mails.interfaces';
import { MailsResolver } from './mails.resolver';

@Module({})
@Global()
export class MailsModule {
  static forRoot(options: MailsModuleOptions): DynamicModule {
    return {
      module: MailsModule,
      providers: [
        { provide: MAIL_CONFIG_OPTIONS, useValue: options },
        MailsService,
        MailsResolver,
      ],
      exports: [MailsService],
    };
  }
}
