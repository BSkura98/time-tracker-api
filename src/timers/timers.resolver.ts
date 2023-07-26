import { Query, Resolver } from '@nestjs/graphql';

import { TimersService } from './timers.service';
import { Timer } from './timer.entity';

@Resolver((of) => Timer)
export class TimersResolver {
  constructor(private timersService: TimersService) {}

  @Query((returns) => [Timer])
  timers(): Promise<Timer[]> {
    return this.timersService.findAll();
  }
}
