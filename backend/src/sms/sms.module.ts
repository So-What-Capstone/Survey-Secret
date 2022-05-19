import { Module, DynamicModule, Global } from '@nestjs/common';
import { SMS_CONFIG_OPTIONS } from '../common/common.constants';
import { SmsService } from './sms.service';
import { SmsModuleOptions } from './sms.interfaces';

@Module({})
@Global()
export class SmsModule {
  static forRoot(options: SmsModuleOptions): DynamicModule {
    return {
      module: SmsModule,
      providers: [
        SmsService,
        {
          provide: SMS_CONFIG_OPTIONS,
          useValue: {
            key: process.env.SMS_API_KEY,
            user_id: process.env.SMS_USER_ID,
          },
        },
      ],
      exports: [SmsService],
    };
  }
}
