import { Test, TestingModule } from '@nestjs/testing';
import { TimersResolver } from './timers.resolver';

describe('TimersResolver', () => {
  let resolver: TimersResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimersResolver],
    }).compile();

    resolver = module.get<TimersResolver>(TimersResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
