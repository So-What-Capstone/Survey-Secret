import { Inject, Injectable } from '@nestjs/common';
import * as aligoapi from 'aligoapi';
import { Request } from 'express';
import { SMS_CONFIG_OPTIONS } from 'src/common/common.constants';
import { SmsModuleOptions } from './sms.interfaces';
import { SendSmsInput } from './dtos/send-sms.dto';
import {
  GetSendHistoryInput,
  GetSendHistoryOutput,
} from './dtos/get-send-history.dto';

@Injectable()
export class SmsService {
  constructor(
    @Inject(SMS_CONFIG_OPTIONS) private readonly options: SmsModuleOptions,
  ) {}

  async sendSms(req: Request, { receiver, msg }: SendSmsInput) {
    try {
      let newReq: Request = req;
      newReq.body = {
        sender: process.env.SMS_SENDER,
        receiver,
        msg,
        msg_type: 'SMS',
      };

      const res = await aligoapi.send(newReq, this.options);

      if (res.result_code === 1) {
        return { ok: true };
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  async getSendHistory(
    req: Request,
    getSendHistoryInput: GetSendHistoryInput,
  ): Promise<GetSendHistoryOutput> {
    try {
      let newReq: Request = req;
      newReq.body = getSendHistoryInput;

      const res = await aligoapi.list(newReq, this.options);

      console.log(res);

      if (res.result_code === 1) {
        return { ok: true, data: res.list };
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }
}
