import { InputType, ObjectType } from '@nestjs/graphql';
import { GetCorrInput, GetCorrOutput } from './get-corr.dto';

@InputType()
export class GetDescribeInput extends GetCorrInput {}

@ObjectType()
export class GetDescribeOutput extends GetCorrOutput {}
