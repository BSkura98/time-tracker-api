import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  forwardRef,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindManyOptions, Repository } from 'typeorm';

import { Timer } from 'src/timers/timer.entity';

import { TimersService } from '../timers/timers.service';
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

  async create(createTimerEntryInput: CreateTimerEntryInput) {
    const { timerName } = createTimerEntryInput;
    let timerId = createTimerEntryInput.timerId;

    if (!timerId && !timerName) {
      throw new HttpException(
        'No timer information provided',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (!timerId) {
      let timer = await this.timersService.findOrCreateOne(timerName);
      timerId = timer.id;
    }

    const newTimerEntry = this.timerEntriesRepository.create({
      ...createTimerEntryInput,
      timerId,
    });

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
    let { timerName, ...timerEntryInput } = updateTimerEntryInput;
    let timerId;
    if (timerName) {
      let timer = await this.timersService.findOrCreateOne(timerName);
      timerId = timer.id;
    }

    if (timerId) {
      timerEntryInput = { ...timerEntryInput, timerId };
    }

    await this.timerEntriesRepository
      .createQueryBuilder('timerEntry')
      .update(TimerEntry)
      .set({ ...timerEntryInput, timerId })
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
