import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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
    private timersService: TimersService,
  ) {}

  create(createTimerEntryInput: CreateTimerEntryInput) {
    const newTimerEntry = this.timerEntriesRepository.create(
      createTimerEntryInput,
    );

    return this.timerEntriesRepository.save(newTimerEntry);
  }

  findAll() {
    return this.timerEntriesRepository.find();
  }

  findOne(id: number) {
    return this.timerEntriesRepository.findOneOrFail({ where: { id } });
  }

  getTimer(timerId: number): Promise<Timer> {
    return this.timersService.findOne(timerId);
  }

  update(id: number, updateTimerEntryInput: UpdateTimerEntryInput) {
    return `This action updates a #${id} timerEntry`;
  }

  remove(id: number) {
    return `This action removes a #${id} timerEntry`;
  }
}
