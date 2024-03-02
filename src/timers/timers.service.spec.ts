import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

import { TimersService } from './timers.service';
import { Timer } from './timer.entity';
import { TimerEntriesService } from '../timer-entries/timer-entries.service';
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

describe('TimersService', () => {
  let service: TimersService;

  const mockTimersRepository = {
    create: jest.fn((dto) => dto),
    save: jest.fn((timer) => Promise.resolve({ id: Date.now(), ...timer })),
    find: jest.fn(() => Promise.resolve(timers)),
    findOneOrFail: jest.fn(({ where: { id, name } }) =>
      Promise.resolve(
        timers.find((timer) => timer.id === id || timer.name === name),
      ),
    ),
    remove: jest.fn((timer) => Promise.resolve(timer)),
  };

  const mockTimerEntriesService = {
    removeAllForTimer: jest.fn((timerId) =>
      timerEntries.filter((entry) => entry.timerId === timerId),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TimersService,
        {
          provide: getRepositoryToken(Timer),
          useValue: mockTimersRepository,
        },
        {
          provide: TimerEntriesService,
          useValue: mockTimerEntriesService,
        },
      ],
    }).compile();

    service = module.get<TimersService>(TimersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a new timer record and return that', async () => {
    expect(await service.createTimer({ name: 'Cooking' })).toEqual({
      id: expect.any(Number),
      name: 'Cooking',
    });
  });

  it('should get all timers', async () => {
    expect(await service.findAll()).toEqual(timers);
  });

  it('should get a timer with given id', async () => {
    const timer = getRandomElement(timers);

    expect(await service.findOne(timer.id)).toEqual(timer);
  });

  it('should get a timer with given name', async () => {
    const timer = getRandomElement(timers);

    expect(await service.findOneByName(timer.name)).toEqual(timer);
  });

  it('should remove a timer', async () => {
    const timer = getRandomElement(timers);

    expect(await service.remove(timer.id)).toEqual(timer);
  });
});
