import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from '../users/schemas/user.schema';
import { Model, ObjectId } from 'mongoose';
import {
  CreateAccountOutput,
  CreateAccountInput,
} from './dtos/create-account.dto';
import { FindUserByIdOutput } from './dtos/find-user-by-id.dto';
import { LoginInput, LoginOutput } from './dtos/login.dto';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken';
import { MailsService } from './../mails/mails.service';
import {
  Verification,
  VerificationDocument,
} from './schemas/verification.schema';
import { v4 } from 'uuid';
import { EditUserInput, EditUserOutput } from './dtos/edit-user.dto';
import { UploaderService } from './../uploader/uploader.service';
import { FileUpload } from 'graphql-upload';
import { meOutput } from './dtos/me.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
    private readonly mailsService: MailsService,
    @InjectModel(Verification.name)
    private readonly verificationModel: Model<VerificationDocument>,
    private readonly uploaderService: UploaderService,
  ) {}

  async createAccount({
    username,
    email,
    password,
  }: CreateAccountInput): Promise<CreateAccountOutput> {
    try {
      const existingUser = await this.userModel.findOne({
        email,
      });

      //email,phone authentication 필요...

      if (existingUser) {
        return { ok: false, error: '이미 사용중인 이메일입니다.' };
      }

      const user = await this.userModel.create({
        username,
        email,
        password: await bcrypt.hash(password, 10),
      });

      //email authentication
      const verification = await this.verificationModel.create({
        code: v4(),
        user,
      });

      await this.mailsService.sendVerificationEmail(
        user.email,
        verification.code,
      );

      return { ok: true };
    } catch (error) {
      return { ok: false, error: error.message };
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
        return { ok: true, token };
      }
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  async findUserById(id: string): Promise<FindUserByIdOutput> {
    try {
      const user = await this.userModel.findById(id);

      if (!user) {
        return { ok: false, error: '유저를 찾을 수 없습니다.' };
      }

      return { ok: true, user };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  async editUser(
    user: User,
    { username, password }: EditUserInput,
    avatarImg: FileUpload,
  ): Promise<EditUserOutput> {
    try {
      let avatarImgUrl: string;
      if (avatarImg) {
        avatarImgUrl = await this.uploaderService.uploadToS3(
          avatarImg,
          user._id.toString(),
          'Users',
        );
      }

      await this.userModel.updateOne(
        { _id: user._id },
        {
          $set: {
            username: username ? username : undefined,
            password: password ? await bcrypt.hash(password, 10) : undefined,
            //need phone verification
            avatarImg: avatarImg ? avatarImgUrl : undefined,
          },
        },
      );

      return { ok: true };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }

  async me(user: User): Promise<meOutput> {
    try {
      const me = await this.userModel.findById(user._id).populate('forms');

      return { ok: true, user: me };
    } catch (error) {
      return { ok: false, error: error.message };
    }
  }
}
