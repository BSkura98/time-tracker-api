import { Test, TestingModule } from '@nestjs/testing';
import { TimersResolver } from './timers.resolver';
import { TimersService } from './timers.service';

describe('TimersResolver', () => {
  let resolver: TimersResolver;

  const mockTimersService = {};

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
});
