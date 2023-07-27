import { Test, TestingModule } from '@nestjs/testing';
import { TimerEntriesResolver } from './timer-entries.resolver';
import { TimerEntriesService } from './timer-entries.service';

describe('TimerEntriesResolver', () => {
  let resolver: TimerEntriesResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimerEntriesResolver, TimerEntriesService],
    }).compile();

    resolver = module.get<TimerEntriesResolver>(TimerEntriesResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
