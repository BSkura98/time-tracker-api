import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Timer } from './timer.entity';
import { CreateTimerInput } from './dto/create-timer.input';

@Injectable()
export class TimersService {
  constructor(
    @InjectRepository(Timer) private timersRepository: Repository<Timer>,
  ) {}

  createTimer(createTimerInput: CreateTimerInput): Promise<Timer> {
    const newTimer = this.timersRepository.create(createTimerInput);

    return this.timersRepository.save(newTimer);
  }

  async findAll(): Promise<Timer[]> {
    return this.timersRepository.find();
  }
}
