import { Test, TestingModule } from '@nestjs/testing';
import { TimersResolver } from './timers.resolver';
import { TimersService } from './timers.service';
import { getRandomElement } from '../utils/getRandomElement';

const getRandomId = () => Math.floor(Math.random() * 100000000);

const timers = [
  {
    id: getRandomId(),
    name: 'Cooking',
  },
  {
    id: getRandomId(),
    name: 'Cleaning',
  },
  {
    id: getRandomId(),
    name: 'Watching TV',
  },
  {
    id: getRandomId(),
    name: 'Working',
  },
];

describe('TimersResolver', () => {
  let resolver: TimersResolver;

  const mockTimersService = {
    createTimer: jest.fn((dto) => ({
      id: Date.now(),
      ...dto,
    })),
    findAll: jest.fn(() => timers),
    findOne: jest.fn((id) => ({
      id,
      name: timers.find((timer) => timer.id === id).name,
    })),
    update: jest.fn((id, dto) => ({
      id,
      ...dto,
    })),
    remove: jest.fn((id) => ({
      id,
      name: timers.find((timer) => timer.id === id).name,
    })),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimersResolver, TimersService],
    })
      .overrideProvider(TimersService)
      .useValue(mockTimersService)
      .compile();

    resolver = module.get<TimersResolver>(TimersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  it('should create a timer', () => {
    const dto = { name: 'Jogging' };

    expect(resolver.createTimer(dto)).toEqual({
      id: expect.any(Number),
      name: dto.name,
    });

    expect(mockTimersService.createTimer).toHaveBeenCalledWith(dto);
  });

  it('should get a timer by id', () => {
    const timer = getRandomElement(timers);

    expect(resolver.findOne(timer.id)).toEqual(timer);

    expect(mockTimersService.findOne).toHaveBeenCalledWith(timer.id);
  });

  it('should get timers', () => {
    expect(resolver.findAll()).toEqual(timers);

    expect(mockTimersService.findAll).toBeCalled();
  });

  it('should update a timer', () => {
    const dto = { id: getRandomElement(timers).id, name: 'Doing nothing' };

    expect(resolver.updateTimer(dto)).toEqual(dto);

    expect(mockTimersService.update).toHaveBeenCalledWith(dto.id, dto);
  });

  it('should remove a timer', () => {
    const timer = getRandomElement(timers);
    console.log(timers);
    expect(resolver.removeTimer(timer.id)).toEqual(timer);

    expect(mockTimersService.remove).toHaveBeenCalledWith(timer.id);
  });
});
