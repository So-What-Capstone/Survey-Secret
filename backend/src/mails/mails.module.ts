import { DynamicModule, Global, Module } from '@nestjs/common';
import { MailsService } from './mails.service';
import { MAIL_CONFIG_OPTIONS } from './../common/common.constants';
import { MailsModuleOptions } from './mails.interfaces';
import { MailsResolver } from './mails.resolver';
import { SmsModule } from './../sms/sms.module';
import { SmsService } from 'src/sms/sms.service';

@Module({})
@Global()
export class MailsModule {
  static forRoot(options: MailsModuleOptions): DynamicModule {
    return {
      module: MailsModule,
      imports: [SmsModule],
      providers: [
        { provide: MAIL_CONFIG_OPTIONS, useValue: options },
        MailsService,
        MailsResolver,
      ],
      exports: [MailsService],
    };
  }
}
