import { Resolver, Query, Args } from '@nestjs/graphql';
import { StatService } from './stat.service';
import {
  GetKeywordAnalysisInput,
  GetKeywordAnalysisOutput,
} from './dtos/get-keyword-analysis.dto';
import { GetCorrOutput, GetCorrInput } from './dtos/get-corr.dto';
import { GetDescribeInput, GetDescribeOutput } from './dtos/get-describe.dto';

@Resolver()
export class StatResolver {
  constructor(private readonly statService: StatService) {}

  @Query((returns) => GetKeywordAnalysisOutput)
  getKeywordAnalysis(
    @Args('input') getKeywordAnalysisInput: GetKeywordAnalysisInput,
  ): Promise<GetKeywordAnalysisOutput> {
    return this.statService.getKeywordAnalysis(getKeywordAnalysisInput);
  }

  @Query((returns) => GetCorrOutput)
  getCorr(@Args('input') getCorrInput: GetCorrInput): Promise<GetCorrOutput> {
    return this.statService.getCorr(getCorrInput);
  }

  @Query((returns) => GetDescribeOutput)
  getDescribe(
    @Args('input') getDescribeInput: GetDescribeInput,
  ): Promise<GetDescribeOutput> {
    return this.statService.getDescribe(getDescribeInput);
  }

  //market basket model
}
