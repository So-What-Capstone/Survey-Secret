import { Resolver, Query, Args } from '@nestjs/graphql';
import { StatService } from './stat.service';
import { CoreOutput } from './../common/dtos/output.dto';
import {
  GetKeywordAnalysisInput,
  GetKeywordAnalysisOutput,
} from './dtos/get-keyword-analysis.dto';

@Resolver()
export class StatResolver {
  constructor(private readonly statService: StatService) {}

  @Query((returns) => GetKeywordAnalysisOutput)
  getKeywordAnalysis(
    @Args('input') getKeywordAnalysisInput: GetKeywordAnalysisInput,
  ): Promise<GetKeywordAnalysisOutput> {
    return this.statService.getKeywordAnalysis(getKeywordAnalysisInput);
  }
}
