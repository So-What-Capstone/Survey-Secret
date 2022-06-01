import { Module, DynamicModule, Global } from '@nestjs/common';
import { SMS_CONFIG_OPTIONS } from '../common/common.constants';
import { SmsService } from './sms.service';
import { SmsModuleOptions } from './sms.interfaces';
import { SmsResolver } from './sms.resolver';

@Module({})
export class SmsModule {
  static forRoot(options: SmsModuleOptions): DynamicModule {
    return {
      module: SmsModule,
      providers: [
        SmsService,
        {
          provide: SMS_CONFIG_OPTIONS,
          useValue: {
            key: options.key,
            user_id: options.user_id,
          },
        },
        SmsResolver,
      ],
      exports: [SmsService],
    };
  }
}
