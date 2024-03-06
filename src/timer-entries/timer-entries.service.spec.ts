import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { TimerEntriesService } from './timer-entries.service';
import { TimerEntry } from './entities/timer-entry.entity';
import { TimersService } from '../timers/timers.service';

describe('TimerEntriesService', () => {
  let service: TimerEntriesService;

  const mockTimerEntriesRepository = {};

  const mockTimersService = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TimerEntriesService,
        {
          provide: getRepositoryToken(TimerEntry),
          useValue: mockTimerEntriesRepository,
        },
        {
          provide: TimersService,
          useValue: mockTimersService,
        },
      ],
    }).compile();

    service = module.get<TimerEntriesService>(TimerEntriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
