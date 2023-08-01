import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

import { TimersService } from 'src/timers/timers.service';
import { Timer } from 'src/timers/timer.entity';
import { CreateTimerEntryInput } from './dto/create-timer-entry.input';
import { UpdateTimerEntryInput } from './dto/update-timer-entry.input';
import { TimerEntry } from './entities/timer-entry.entity';

@Injectable()
export class TimerEntriesService {
  constructor(
    @InjectRepository(TimerEntry)
    private timerEntriesRepository: Repository<TimerEntry>,
    @Inject(forwardRef(() => TimersService))
    private timersService: TimersService,
  ) {}

  create(createTimerEntryInput: CreateTimerEntryInput) {
    const newTimerEntry = this.timerEntriesRepository.create(
      createTimerEntryInput,
    );

    return this.timerEntriesRepository.save(newTimerEntry);
  }

  findAll(options?: FindManyOptions<TimerEntry>) {
    return this.timerEntriesRepository.find(options);
  }

  findOne(id: number) {
    return this.timerEntriesRepository.findOneOrFail({ where: { id } });
  }

  getTimer(timerId: number): Promise<Timer> {
    return this.timersService.findOne(timerId);
  }

  async update(
    id: number,
    updateTimerEntryInput: UpdateTimerEntryInput,
  ): Promise<TimerEntry> {
    await this.timerEntriesRepository
      .createQueryBuilder('timerEntry')
      .update(TimerEntry)
      .set(updateTimerEntryInput)
      .where('id = :id', { id })
      .execute();
    return this.timerEntriesRepository.findOneOrFail({ where: { id } });
  }

  async remove(id: number): Promise<TimerEntry> {
    const timerEntry = await this.timerEntriesRepository.findOneOrFail({
      where: { id },
    });

    await this.timerEntriesRepository.remove(timerEntry);

    return timerEntry;
  }

  async removeAllForTimer(timerId: number): Promise<TimerEntry[]> {
    const entries = await this.timerEntriesRepository.find({
      where: { timerId },
    });

    for (let entry of entries) {
      await this.timerEntriesRepository.remove(entry);
    }

    return entries;
  }
}
