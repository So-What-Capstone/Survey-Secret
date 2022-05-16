import { EmailVar, MailsModuleOptions } from './mails.interfaces';
export declare class MailsService {
    private readonly options;
    constructor(options: MailsModuleOptions);
    sendEmail(subject: string, to: string, template: string, emailVars: EmailVar[]): Promise<void>;
    sendVerificationEmail(email: string, code: string): Promise<void>;
}
