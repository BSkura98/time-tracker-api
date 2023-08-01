import {
  Resolver,
  Query,
  Mutation,
  Args,
  Int,
  Parent,
  ResolveField,
} from '@nestjs/graphql';
import { Between, FindManyOptions } from 'typeorm';

import { Timer } from 'src/timers/timer.entity';
import { TimerEntriesService } from './timer-entries.service';
import { TimerEntry } from './entities/timer-entry.entity';
import { CreateTimerEntryInput } from './dto/create-timer-entry.input';
import { UpdateTimerEntryInput } from './dto/update-timer-entry.input';
import { FilterTimerEntryInput } from './dto/filter-timer-entry.input';
import { endOfDay, startOfDay } from 'date-fns';

@Resolver((of) => TimerEntry)
export class TimerEntriesResolver {
  constructor(private readonly timerEntriesService: TimerEntriesService) {}

  @Mutation(() => TimerEntry)
  createTimerEntry(
    @Args('createTimerEntryInput') createTimerEntryInput: CreateTimerEntryInput,
  ) {
    return this.timerEntriesService.create(createTimerEntryInput);
  }

  @Query(() => [TimerEntry], { name: 'timerEntries' })
  findAll(
    @Args({ name: 'filterTimerEntryInput', nullable: true })
    filterTimerEntryInput?: FilterTimerEntryInput,
  ) {
    let options: FindManyOptions<TimerEntry> = {};
    if (filterTimerEntryInput?.startTimeDay) {
      options.where = {
        startTime: Between(
          startOfDay(filterTimerEntryInput.startTimeDay),
          endOfDay(filterTimerEntryInput.startTimeDay),
        ),
      };
    }

    return this.timerEntriesService.findAll(options);
  }

  @Query(() => TimerEntry, { name: 'timerEntry' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.timerEntriesService.findOne(id);
  }

  @ResolveField((returns) => Timer)
  timer(@Parent() entry: TimerEntry): Promise<Timer> {
    return this.timerEntriesService.getTimer(entry.timerId);
  }

  @Mutation(() => TimerEntry)
  updateTimerEntry(
    @Args('updateTimerEntryInput') updateTimerEntryInput: UpdateTimerEntryInput,
  ) {
    return this.timerEntriesService.update(
      updateTimerEntryInput.id,
      updateTimerEntryInput,
    );
  }

  @Mutation(() => TimerEntry)
  removeTimerEntry(@Args('id', { type: () => Int }) id: number) {
    return this.timerEntriesService.remove(id);
  }
}
