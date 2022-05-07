import { Resolver, Query } from '@nestjs/graphql';
import { StatService } from './stat.service';
import { CoreOutput } from './../common/dtos/output.dto';

@Resolver()
export class StatResolver {
  constructor(private readonly statService: StatService) {}

  @Query((returns) => CoreOutput)
  getStat(): Promise<CoreOutput> {
    return this.statService.getStat();
  }
}
