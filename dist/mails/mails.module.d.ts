import { DynamicModule } from '@nestjs/common';
import { MailsModuleOptions } from './mails.interfaces';
export declare class MailsModule {
    static forRoot(options: MailsModuleOptions): DynamicModule;
}
