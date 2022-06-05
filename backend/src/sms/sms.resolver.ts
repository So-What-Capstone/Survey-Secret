import { Args, Context, Mutation, Resolver, Query } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import {
  GetSendHistoryInput,
  GetSendHistoryOutput,
} from './dtos/get-send-history.dto';
import { SendSmsInput, SendSmsOutput } from './dtos/send-sms.dto';
import { SmsService } from './sms.service';
import { User } from './../users/schemas/user.schema';
import { Type } from 'src/auth/type.decorator';

@Resolver()
export class SmsResolver {
  constructor(private readonly smsService: SmsService) {}

  @Mutation((returns) => SendSmsOutput)
  @Type(['Any'])
  sendSms(
    @AuthUser() user: User,
    @Context() context,
    @Args('input') sendSmsInput: SendSmsInput,
  ): Promise<SendSmsOutput> {
    return this.smsService.sendSms(user, context.req, sendSmsInput);
  }

  @Query((returns) => GetSendHistoryOutput)
  @Type(['Any'])
  getSendHistory(
    @AuthUser() user: User,
    @Args('input') getSendHistoryInput: GetSendHistoryInput,
  ): Promise<GetSendHistoryOutput> {
    return this.smsService.getSendHistory(user, getSendHistoryInput);
  }
}
