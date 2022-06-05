import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { SendEmailInput, SendEmailOutput } from './dtos/send-email.dto';
import { MailsService } from './mails.service';

@Resolver()
export class MailsResolver {
  constructor(private readonly mailsService: MailsService) {}

  @Mutation((returns) => SendEmailOutput)
  sendEmail(
    @Args('input') sendEmailInput: SendEmailInput,
  ): Promise<SendEmailOutput> {
    return this.mailsService.sendEmail(sendEmailInput);
  }
}
