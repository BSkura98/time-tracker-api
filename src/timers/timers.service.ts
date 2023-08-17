import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { TimerEntry } from 'src/timer-entries/entities/timer-entry.entity';
import { TimerEntriesService } from 'src/timer-entries/timer-entries.service';
import { Timer } from './timer.entity';
import { CreateTimerInput } from './dto/create-timer.input';
import { UpdateTimerInput } from './dto/update-timer.input';

@Injectable()
export class TimersService {
  constructor(
    @InjectRepository(Timer) private timersRepository: Repository<Timer>,
    @Inject(forwardRef(() => TimerEntriesService))
    private timerEntriesService: TimerEntriesService,
  ) {}

  createTimer(createTimerInput: CreateTimerInput): Promise<Timer> {
    const newTimer = this.timersRepository.create(createTimerInput);

    return this.timersRepository.save(newTimer);
  }

  findAll(): Promise<Timer[]> {
    return this.timersRepository.find();
  }

  findOne(id: number): Promise<Timer> {
    return this.timersRepository.findOneOrFail({ where: { id } });
  }

  findOneByName(name: string): Promise<Timer> {
    return this.timersRepository.findOneOrFail({ where: { name } });
  }

  async findOrCreateOne(name: string): Promise<Timer> {
    let timer;
    try {
      timer = await this.findOneByName(name);
    } catch {
      timer = await this.createTimer({ name });
    }
    return timer;
  }

  async getTimerEntries(timerId: number): Promise<TimerEntry[]> {
    return this.timerEntriesService.findAll({ where: { timerId } });
  }

  async update(id: number, updateTimerInput: UpdateTimerInput): Promise<Timer> {
    await this.timersRepository
      .createQueryBuilder('timer')
      .update(Timer)
      .set(updateTimerInput)
      .where('id = :id', { id })
      .execute();
    return this.timersRepository.findOneOrFail({ where: { id } });
  }

  async remove(id: number): Promise<Timer> {
    const timer = await this.timersRepository.findOneOrFail({ where: { id } });

    await this.timerEntriesService.removeAllForTimer(id);
    await this.timersRepository.remove(timer);

    return timer;
  }
}
