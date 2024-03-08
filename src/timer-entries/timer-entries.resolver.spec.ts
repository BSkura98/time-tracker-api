import { Test, TestingModule } from '@nestjs/testing';

import { TimerEntriesResolver } from './timer-entries.resolver';
import { TimerEntriesService } from './timer-entries.service';
import { getRandomElement } from '../utils/getRandomElement';

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

describe('TimerEntriesResolver', () => {
  let resolver: TimerEntriesResolver;

  const mockTimerEntriesService = {
    create: jest.fn((dto) => ({ id: Date.now(), ...dto })),
    findAll: jest.fn(() => timerEntries),
    findOne: jest.fn((id) =>
      timerEntries.find((timerEntry) => timerEntry.id === id),
    ),
    // getTimer: jest.fn(id => ),
    update: jest.fn((id, dto) => ({ id, ...dto })),
    remove: jest.fn((id) =>
      timerEntries.find((timerEntry) => timerEntry.id === id),
    ),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        TimerEntriesResolver,
        {
          provide: TimerEntriesService,
          useValue: mockTimerEntriesService,
        },
      ],
    }).compile();

    resolver = module.get<TimerEntriesResolver>(TimerEntriesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create a timer entry', () => {
    const dto = {
      timerId: 162778535818872,
      startTime: new Date(2024, 4, 2, 10, 4, 53, 235),
    };

    expect(resolver.createTimerEntry(dto)).toEqual({
      id: expect.any(Number),
      ...dto,
    });
  });

  it('should get a timer entry by id', () => {
    const timerEntry = getRandomElement(timerEntries);

    expect(resolver.findOne(timerEntry.id)).toEqual(timerEntry);
  });

  it("should get timers' entries", () => {
    expect(resolver.findAll()).toEqual(timerEntries);
  });

  it('should update a timer entry', () => {
    const dto = { id: getRandomElement(timerEntries).id, endDate: new Date() };

    expect(resolver.updateTimerEntry(dto)).toEqual(dto);
  });

  it('should remove a timer entry', () => {
    const timerEntry = getRandomElement(timerEntries);

    expect(resolver.removeTimerEntry(timerEntry.id)).toEqual(timerEntry);
  });
});
