import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { SendEmailInput, SendEmailOutput } from './dtos/send-email.dto';
import { MailsService } from './mails.service';
import { User } from 'src/users/schemas/user.schema';

@Resolver()
export class MailsResolver {
  constructor(private readonly mailsService: MailsService) {}

  @Mutation((returns) => SendEmailOutput)
  sendEmail(
    @AuthUser() user: User,
    @Args('input') sendEmailInput: SendEmailInput,
  ): Promise<SendEmailOutput> {
    return this.mailsService.sendEmail(user, sendEmailInput);
  }
}
