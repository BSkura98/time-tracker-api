import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { TimerEntriesService } from './timer-entries.service';
import { TimerEntry } from './entities/timer-entry.entity';
import { TimersService } from '../timers/timers.service';
import { getRandomElement } from '../utils/getRandomElement';

const timers = [
  {
    id: 3182399132219,
    name: 'Cooking',
  },
  {
    id: 59543181763204,
    name: 'Cleaning',
  },
  {
    id: 88353385553853,
    name: 'Watching TV',
  },
  {
    id: 162778535818872,
    name: 'Working',
  },
];

const timerEntries = [
  {
    id: 63917760930392,
    startTime: new Date(2024, 3, 15, 16, 42, 21),
    endTime: new Date(2024, 3, 15, 18, 10, 59),
    timerId: 88353385553853,
  },
  {
    id: 5334513729142,
    startTime: new Date(2024, 3, 19, 13, 10, 58),
    endTime: new Date(2024, 3, 19, 14, 0, 3),
    timerId: 88353385553853,
  },
  {
    id: 6664179850704,
    startTime: new Date(2024, 3, 17, 8, 0, 0),
    endTime: new Date(2024, 3, 17, 16, 0, 0),
    timerId: 162778535818872,
  },
];

describe('TimerEntriesService', () => {
  let service: TimerEntriesService;

  const mockTimerEntriesRepository = {
    create: jest.fn((timerEntry) => timerEntry),
    save: jest.fn((timerEntry) =>
      Promise.resolve({ id: Date.now(), ...timerEntry }),
    ),
    find: jest.fn(() => timerEntries),
    findOneOrFail: jest.fn(({ where: { id } }) =>
      timerEntries.find((entry) => entry.id === id),
    ),
    remove: jest.fn((timerEntry) => Promise.resolve(timerEntry)),
  };

  const mockTimersService = {
    findOrCreateOne: jest.fn((name) =>
      Promise.resolve(
        timers.find((timer) => timer.name === name) ?? { id: Date.now(), name },
      ),
    ),
  };

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

  it('should create a new timer entry', async () => {
    const startTime = new Date();
    const timer = getRandomElement(timers);

    expect(await service.create({ timerName: timer.name, startTime })).toEqual({
      timerName: timer.name,
      timerId: timer.id,
      startTime,
      id: expect.any(Number),
    });
  });

  it('should get all timers entries', async () => {
    expect(await service.findAll()).toEqual(timerEntries);
  });

  it('should get a timer entry with given id', async () => {
    const timerEntry = getRandomElement(timerEntries);

    expect(await service.findOne(timerEntry.id)).toEqual(timerEntry);
  });

  it('should remove a timer entry', async () => {
    const timerEntry = getRandomElement(timerEntries);

    expect(await service.remove(timerEntry.id)).toEqual(timerEntry);
  });
});
