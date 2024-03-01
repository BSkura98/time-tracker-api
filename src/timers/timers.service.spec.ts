import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { TimersService } from './timers.service';
import { Timer } from './timer.entity';
import { TimerEntriesService } from '../timer-entries/timer-entries.service';
import { TimerEntry } from '../timer-entries/entities/timer-entry.entity';

describe('TimersService', () => {
  let service: TimersService;

  const mockTimersService = {};

  const mockTimerEntriesService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TimersService,
        TimerEntriesService,
        {
          provide: getRepositoryToken(Timer),
          useValue: mockTimersService,
        },
        {
          provide: getRepositoryToken(TimerEntry),
          useValue: mockTimerEntriesService,
        },
      ],
    }).compile();

    service = module.get<TimersService>(TimersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
