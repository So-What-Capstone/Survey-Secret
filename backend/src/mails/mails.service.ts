import { Inject, Injectable } from '@nestjs/common';
import { MAIL_CONFIG_OPTIONS } from './../common/common.constants';
import { EmailVar, MailsModuleOptions } from './mails.interfaces';
import * as FormData from 'form-data';
import Mailgun from 'mailgun.js';
import { SendEmailInput, SendEmailOutput } from './dtos/send-email.dto';

@Injectable()
export class MailsService {
  constructor(
    @Inject(MAIL_CONFIG_OPTIONS) private readonly options: MailsModuleOptions,
  ) {}

  async sendEmail({
    subject,
    to,
    template,
    emailVars,
  }: SendEmailInput): Promise<SendEmailOutput> {
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
        template: 'default',
      };

      emailVars?.forEach(
        (emailVar) => (messageData[`v:${emailVar.key}`] = emailVar.value),
      );

      await client.messages.create(this.options.domain, messageData);

      return { ok: true };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  async sendVerificationEmail(email: string, code: string) {
    const sendEmailInput: SendEmailInput = {
      subject: 'Verify your email',
      to: email,
      template: 'email_auth',
      emailVars: [
        { key: 'code', value: code },
        { key: 'username', value: email },
      ],
    };

    await this.sendEmail(sendEmailInput);
  }
}
