import { Inject, Injectable } from '@nestjs/common';
import { MAIL_CONFIG_OPTIONS } from './../common/common.constants';
import { EmailVar, MailsModuleOptions } from './mails.interfaces';
import * as FormData from 'form-data';
import Mailgun from 'mailgun.js';

@Injectable()
export class MailsService {
  constructor(
    @Inject(MAIL_CONFIG_OPTIONS) private readonly options: MailsModuleOptions,
  ) {}

  async sendEmail(
    subject: string,
    to: string,
    template: string,
    emailVars: EmailVar[],
  ) {
    try {
      const mailgun = new Mailgun(FormData);
      const client = mailgun.client({
        username: 'api',
        key: this.options.apiKey,
      });

      const messageData = {
        from: `${this.options.fromEmail}@${this.options.domain}`,
        to,
        subject,
        template: 'email_auth',
      };

      emailVars.forEach(
        (emailVar) => (messageData[`v:${emailVar.key}`] = emailVar.value),
      );

      await client.messages.create(this.options.domain, messageData);
    } catch (error) {
      console.error(error);
    }
  }

  async sendVerificationEmail(email: string, code: string) {
    await this.sendEmail('Verify your email', email, 'email_auth', [
      { key: 'code', value: code },
      { key: 'username', value: email },
    ]);
  }
}
