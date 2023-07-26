import { Injectable } from '@nestjs/common';

import { Timer } from './timer.entity';

@Injectable()
export class TimersService {
  async findAll(): Promise<Timer[]> {
    const timer = new Timer();

    timer.id = 1;
    timer.name = 'Cooking';

    return [timer];
  }
}
