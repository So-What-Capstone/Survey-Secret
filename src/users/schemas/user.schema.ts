import {
  Field,
  ObjectType,
  InputType,
  registerEnumType,
  Int,
} from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory, SchemaOptions } from '@nestjs/mongoose';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNumber,
  IsString,
  Length,
} from 'class-validator';
import { CoreSchema } from './../../common/schemas/core.schema';

export enum UserType {
  Free = 'Free',
  Premium = 'Premium',
  Admin = 'Admin',
}

registerEnumType(UserType, { name: 'UserType' });

export type UserDocument = User & Document;

const schemaOption: SchemaOptions = {
  timestamps: true,
  autoIndex: true,
};

@InputType('UserInput', { isAbstract: true })
@ObjectType()
@Schema(schemaOption)
export class User extends CoreSchema {
  //id는 mongoose 자동생성 id 사용(_id)

  //for graphql type
  @Field((type) => String)
  //for mongoDB type
  @Prop({ type: String, required: true, trim: true })
  //for class validator, input값 들어오면 string인지 체킹하고 아니면 서버로 오기전에 그냥 리턴
  @IsString()
  username: string;

  @Field((type) => String, { nullable: true })
  @Prop({
    type: String,
    unique: true,
    sparse: true,
    default: true,
    match: /^[0-9]{11}$/,
  })
  @IsString()
  @Length(11, 11)
  phoneNum?: string;

  @Field((type) => String)
  @Prop({
    type: String,
    required: true,
    unique: true,
    index: true,
    trim: true,
  })
  @IsEmail()
  email: string;

  @Field((type) => String)
  @Prop({ type: String, required: true })
  @IsString()
  password: string;

  @Field((type) => Number)
  @Prop({
    type: String,
    enum: UserType,
    required: true,
    default: UserType.Free,
  })
  @IsEnum(UserType)
  type: UserType;

  @Field((type) => Int)
  @Prop({ type: Number, default: 0, required: true })
  @IsInt()
  coin: number;

  @Field((type) => String, { nullable: true })
  @Prop({ type: String }) //default : AWS 기본 프로필사진 링크
  avatarImg?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
