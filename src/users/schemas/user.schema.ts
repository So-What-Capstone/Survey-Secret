import {
  Field,
  ObjectType,
  InputType,
  registerEnumType,
  Int,
} from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsMongoId,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';
import mongoose from 'mongoose';
import { Form } from '../../forms/schemas/form.schema';
import { CoreSchema } from './../../common/schemas/core.schema';
import { schemaOption } from './../../common/schemas/option.schema';

//enum type 정의
export enum UserType {
  Free = 'Free',
  Premium = 'Premium',
  Admin = 'Admin',
}

//enum type을 graphql type에 등록
registerEnumType(UserType, { name: 'UserType' });

//userService에서 inject 할 때 사용합니다.
export type UserDocument = User & Document;

@InputType('UserInput', { isAbstract: true })
@ObjectType()
@Schema(schemaOption)
export class User extends CoreSchema {
  //id는 mongoose 자동생성 id 사용(_id)
  @Field((type) => String)
  @IsMongoId()
  _id: mongoose.Schema.Types.ObjectId;

  //for graphql type
  @Field((type) => String)
  //for mongoDB type
  @Prop({ type: String, required: true, trim: true, maxlength: 20 })
  //for class validator, input값 들어오면 string인지 체킹하고 아니면 서버로 오기전에 그냥 리턴
  @IsString()
  username: string;

  @Field((type) => String, { nullable: true })
  @Prop({
    type: String,
    unique: true,
    sparse: true,
    default: null,
    match: /^[0-9]{11}$/,
    select: false,
  })
  @IsString()
  @Length(11, 11)
  @IsOptional()
  phoneNum?: string;

  @Field((type) => String)
  @Prop({
    type: String,
    required: true,
    unique: true,
    trim: true,
    minlength: 5,
    maxlength: 30,
  })
  @IsEmail()
  @Length(5, 30)
  email: string;

  @Field((type) => String)
  @Prop({ type: String, required: true, select: false })
  @IsString()
  password: string;

  @Field((type) => UserType)
  @Prop({
    type: String,
    enum: UserType,
    required: true,
    default: UserType.Free,
  })
  @IsEnum(UserType)
  type: UserType;

  @Field((type) => Int, { nullable: true })
  @Prop({ type: Number, default: 0, required: true })
  @IsInt()
  coin?: number;

  //값이 안들어와도 되는 경우에는 graphql에서 nullable option 넣고, typescript에도 ? 꼭 맞춰주셔야 됩니다!
  @Field((type) => String, { nullable: true })
  @Prop({ type: String }) //default : AWS 기본 프로필사진 링크
  @IsString()
  avatarImg?: string;

  //소유한 forms
  @Field((type) => [Form], { nullable: true })
  @Prop({ type: [mongoose.Schema.Types.ObjectId], ref: 'Form' })
  forms?: Form[];

  @Field((type) => Boolean, { nullable: true })
  @Prop({ type: Boolean, required: true, default: false })
  isVerified?: boolean;
}

//class를 토대로 schema를 생성합니다.
export const UserSchema = SchemaFactory.createForClass(User);
