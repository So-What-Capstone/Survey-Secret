import { InputType, ObjectType, PickType } from '@nestjs/graphql';
import { GetCorrInput, GetCorrOutput } from './get-corr.dto';

@InputType()
export class GetDescribeInput extends PickType(GetCorrInput, ['formId']) {}

@ObjectType()
export class GetDescribeOutput extends GetCorrOutput {}
