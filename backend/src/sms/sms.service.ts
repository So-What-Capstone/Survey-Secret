import { Inject, Injectable } from '@nestjs/common';
import * as aligoapi from 'aligoapi';
import { Request } from 'express';
import { SMS_CONFIG_OPTIONS } from 'src/common/common.constants';
import { SmsModuleOptions } from './sms.interfaces';
import { SendSmsInput } from './dtos/send-sms.dto';

@Injectable()
export class SmsService {
  constructor(
    @Inject(SMS_CONFIG_OPTIONS) private readonly options: SmsModuleOptions,
  ) {}

  async sendSms(req: Request, { sender, receiver, msg }: SendSmsInput) {
    try {
      let newReq: Request = req;
      newReq.body = {
        sender,
        receiver,
        msg,
        msg_type: 'SMS',
        cnt: 1,
      };
      const res = await aligoapi.send(newReq, this.options);
      if (res.result_code === 200) {
        return { ok: true };
      } else {
        throw new Error(res.message);
      }
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }
}
