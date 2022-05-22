import { Args, Context, Mutation, Resolver, Query } from '@nestjs/graphql';
import {
  GetSendHistoryInput,
  GetSendHistoryOutput,
} from './dtos/get-send-history.dto';
import { SendSmsInput, SendSmsOutput } from './dtos/send-sms.dto';
import { SmsService } from './sms.service';

@Resolver()
export class SmsResolver {
  constructor(private readonly smsService: SmsService) {}

  @Mutation((returns) => SendSmsOutput)
  sendSms(
    @Context() context,
    @Args('input') sendSmsInput: SendSmsInput,
  ): Promise<SendSmsOutput> {
    return this.smsService.sendSms(context.req, sendSmsInput);
  }

  @Query((returns) => GetSendHistoryOutput)
  getSendHistory(
    @Context() context,
    @Args('input') getSendHistoryInput: GetSendHistoryInput,
  ): Promise<GetSendHistoryOutput> {
    return this.smsService.getSendHistory(context.req, getSendHistoryInput);
  }
}
