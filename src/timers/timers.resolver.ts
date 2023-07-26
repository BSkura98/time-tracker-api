import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';

import { TimersService } from './timers.service';
import { Timer } from './timer.entity';
import { CreateTimerInput } from './dto/create-timer.input';

@Resolver((of) => Timer)
export class TimersResolver {
  constructor(private timersService: TimersService) {}

  @Query((returns) => [Timer])
  timers(): Promise<Timer[]> {
    return this.timersService.findAll();
  }

  @Mutation((returns) => Timer)
  createTimer(
    @Args('createTimerInput') createTimerInput: CreateTimerInput,
  ): Promise<Timer> {
    return this.timersService.createTimer(createTimerInput);
  }
}
