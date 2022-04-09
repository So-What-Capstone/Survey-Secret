import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';
import { Model } from 'mongoose';
import {
  CreateAccountOutput,
  CreateAccountInput,
} from './dtos/create-account.dto';
import {
  FindUserByIdInput,
  FindUserByIdOutput,
} from './dtos/find-user-by-id.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { MailsService } from './../mails/mails.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly mailsService: MailsService,
  ) {}

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
        password: await bcrypt.hash(password, 10),
        phoneNum,
      });

      return { ok: true };
    } catch (error) {
      return { ok: false, error };
    }
  }

  async login({ email, password }: LoginInput): Promise<LoginOutput> {
    try {
      const user = await this.userModel.findOne({ email }, 'email password');
      if (!user) {
        return { ok: false, error: '이메일을 확인해주세요.' };
      }

      const isMatched = await bcrypt.compare(password, user.password);
      if (!isMatched) {
        return { ok: false, error: '비밀번호를 확인해주세요.' };
      } else {
        const token = jwt.sign(user._id.toString(), process.env.SECRET_KEY);
        console.log(token);
        return { ok: true, token };
      }
    } catch (error) {
      return { ok: false, error };
    }
  }

  async findById(id: string): Promise<FindUserByIdOutput> {
    try {
      const user = await this.userModel.findById(id);

      if (!user) {
        return { ok: false, error: '유저를 찾을 수 없습니다.' };
      }

      return { ok: true, user };
    } catch (error) {
      return { ok: false, error };
    }
  }
}
