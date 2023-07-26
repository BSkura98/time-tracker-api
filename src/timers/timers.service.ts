import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Timer } from './timer.entity';

@Injectable()
export class TimersService {
  constructor(
    @InjectRepository(Timer) private timersRepository: Repository<Timer>,
  ) {}

  async findAll(): Promise<Timer[]> {
    return this.timersRepository.find();
  }
}
