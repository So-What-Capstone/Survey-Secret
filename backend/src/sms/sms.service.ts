import { Inject, Injectable } from '@nestjs/common';
import * as aligoapi from 'aligoapi';
import { Request } from 'express';
import { SMS_CONFIG_OPTIONS } from 'src/common/common.constants';
import { SmsModuleOptions } from './sms.interfaces';

@Injectable()
export class SmsService {
  constructor(
    @Inject(SMS_CONFIG_OPTIONS) private readonly options: SmsModuleOptions,
  ) {}

  async sendSms(req: Request) {
    try {
      let newReq: Request = req;
      newReq.body = {
        sender: '01077105657',
        receiver: '01077105657',
        msg: 'sample msg',
        msg_type: 'SMS',
        cnt: 1,
      };
      console.log(this.options);
      const res = await aligoapi.send(newReq, this.options);
      console.log(res);
      return { ok: true };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }
}
