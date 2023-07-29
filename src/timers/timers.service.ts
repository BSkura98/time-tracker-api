import { Inject, Injectable, forwardRef } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, UpdateResult } from 'typeorm';

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

  async update(id: number, updateTimerInput: UpdateTimerInput): Promise<Timer> {
    await this.timersRepository
      .createQueryBuilder('timer')
      .update(Timer)
      .set(updateTimerInput)
      .where('id = :id', { id })
      .execute();
    return this.timersRepository.findOneOrFail({ where: { id } });
  }

  // TODO Remove also timer entries
  async remove(id: number): Promise<Timer> {
    const timer = await this.timersRepository.findOneOrFail({ where: { id } });

    // console.log(timer);
    // timer.entries.forEach((entry) => this.timerEntriesService.remove(entry.id));
    await this.timersRepository.remove(timer);

    return timer;
  }
}
