import { Inject, Injectable } from '@nestjs/common';
import { MAIL_CONFIG_OPTIONS } from './../common/common.constants';
import { EmailVar, MailsModuleOptions } from './mails.interfaces';
import { SendEmailInput, SendEmailOutput } from './dtos/send-email.dto';
import { SmsService } from 'src/sms/sms.service';
import { User } from './../users/schemas/user.schema';
import { PersonalQuestionType } from 'src/forms/questions/schemas/personal-question.schema';
import * as FormData from 'form-data';
import { ContactType } from 'src/sms/schemas/contact.schema';
const Mailgun = require('mailgun.js');

@Injectable()
export class MailsService {
  constructor(
    @Inject(MAIL_CONFIG_OPTIONS) private readonly options: MailsModuleOptions,
    @Inject(SmsService) private readonly smsService: SmsService,
  ) {}

  async sendEmail(
    user: User,
    {
      subject,
      template,
      emailVars,
      formId,
      questionId,
      submissionIds,
    }: SendEmailInput,
  ): Promise<SendEmailOutput> {
    try {
      const receivers: string[] = await this.smsService.getReceivers(
        formId,
        submissionIds,
        questionId,
        user,
        PersonalQuestionType.Email,
      );

      const mailgun = new Mailgun(FormData);
      const client = mailgun.client({
        username: 'api',
        key: this.options.apiKey,
      });

      const messageData = {
        from: `${this.options.fromEmail}@${this.options.domain}`,
        to: receivers,
        subject,
        template: 'default',
      };

      let msg: string;

      emailVars?.forEach((emailVar) => {
        if (emailVar.key === 'body') {
          msg = emailVar.value;
        }
        messageData[`v:${emailVar.key}`] = emailVar.value;
      });

      console.log(emailVars);

      const { status, message } = await client.messages.create(
        this.options.domain,
        messageData,
      );

      if (status == 200) {
        await this.smsService.addHistoryInDB(
          user,
          msg,
          formId,
          submissionIds,
          ContactType.EMAIL,
        );

        return { ok: true };
      } else {
        throw new Error(message);
      }
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  // async sendVerificationEmail(email: string, code: string) {
  //   const sendEmailInput: SendEmailInput = {
  //     subject: 'Verify your email',
  //     to: email,
  //     template: 'email_auth',
  //     emailVars: [
  //       { key: 'code', value: code },
  //       { key: 'username', value: email },
  //     ],
  //   };

  //   // await this.sendEmail(sendEmailInput);
  // }
}
