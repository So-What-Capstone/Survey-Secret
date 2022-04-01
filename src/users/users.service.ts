import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';
import { Model } from 'mongoose';
import {
  CreateAccountOutput,
  CreateAccountInput,
} from './dtos/create-account.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {}

  async createAccount({
    username,
    email,
    password,
    phoneNum,
  }: CreateAccountInput): Promise<CreateAccountOutput> {
    try {
      const existingUser = await this.userModel.findOne({
        email,
      });

      //email,phone authentication 필요...

      if (existingUser) {
        return { ok: false, error: '이미 사용중인 이메일입니다.' };
      }

      await this.userModel.create({
        username,
        email,
        password: await hash(password, 10),
        phoneNum,
      });

      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  }
}
