import {
  Args,
  Int,
  Mutation,
  Parent,
  Query,
  ResolveField,
  Resolver,
} from '@nestjs/graphql';

import { TimerEntry } from '../timer-entries/entities/timer-entry.entity';
import { TimersService } from './timers.service';
import { Timer } from './timer.entity';
import { CreateTimerInput } from './dto/create-timer.input';
import { UpdateTimerInput } from './dto/update-timer.input';

@Resolver((of) => Timer)
export class TimersResolver {
  constructor(private timersService: TimersService) {}

  @Query((returns) => Timer, { name: 'timer' })
  findOne(@Args('id', { type: () => Int }) id: number): Promise<Timer> {
    return this.timersService.findOne(id);
  }

  @Query((returns) => [Timer], { name: 'timers' })
  findAll(): Promise<Timer[]> {
    return this.timersService.findAll();
  }

  @ResolveField((returns) => [TimerEntry])
  entries(@Parent() timer: Timer): Promise<TimerEntry[]> {
    console.log(timer);
    return this.timersService.getTimerEntries(timer.id);
  }

  @Mutation((returns) => Timer)
  createTimer(
    @Args('createTimerInput') createTimerInput: CreateTimerInput,
  ): Promise<Timer> {
    return this.timersService.createTimer(createTimerInput);
  }

  @Mutation((returns) => Timer)
  updateTimer(@Args('updateTimerInput') updateTimerInput: UpdateTimerInput) {
    return this.timersService.update(updateTimerInput.id, updateTimerInput);
  }

  @Mutation((returns) => Timer)
  removeTimer(@Args('id', { type: () => Int }) id: number) {
    return this.timersService.remove(id);
  }
}
