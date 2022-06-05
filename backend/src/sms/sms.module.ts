import { Module, DynamicModule, Global } from '@nestjs/common';
import { SMS_CONFIG_OPTIONS } from '../common/common.constants';
import { SmsService } from './sms.service';
import { SmsModuleOptions } from './sms.interfaces';
import { SmsResolver } from './sms.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Contact, ContactSchema } from './schemas/contact.schema';
import { FormSchema } from 'src/forms/schemas/form.schema';
import { Form } from './../forms/schemas/form.schema';
import { User, UserSchema } from 'src/users/schemas/user.schema';

@Module({})
@Global()
export class SmsModule {
  static forRoot(options: SmsModuleOptions): DynamicModule {
    return {
      module: SmsModule,
      imports: [
        MongooseModule.forFeature([
          {
            name: Contact.name,
            schema: ContactSchema,
          },
          {
            name: User.name,
            schema: UserSchema,
          },
          {
            name: Form.name,
            schema: FormSchema,
          },
        ]),
      ],
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
