import {
  Field,
  InputType,
  ObjectType,
  registerEnumType,
} from '@nestjs/graphql';
import { CoreOutput } from './../../common/dtos/output.dto';
import { IsEnum, IsMongoId, IsString } from 'class-validator';

export enum MsgType {
  SMS = 'SMS',
  LMS = 'LMS',
}

registerEnumType(MsgType, { name: 'MsgType' });

@InputType()
export class SendSmsInput {
  @Field((type) => String)
  @IsMongoId()
  formId: string;

  @Field((type) => [String])
  @IsMongoId({ each: true })
  submissionIds: string[];

  @Field((type) => String)
  @IsMongoId()
  questionId: string;

  // @Field((type) => String)
  // @IsString()
  // // 컴마(,)분기 입력으로 최대 1천명
  // receiver: string;

  @Field((type) => String)
  @IsString()
  msg: string;

  @Field((type) => MsgType)
  @IsEnum(MsgType)
  msgType: MsgType;
}

@ObjectType()
export class SendSmsOutput extends CoreOutput {}
