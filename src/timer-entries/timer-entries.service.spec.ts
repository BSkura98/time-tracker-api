import { Test, TestingModule } from '@nestjs/testing';
import { TimerEntriesService } from './timer-entries.service';

describe('TimerEntriesService', () => {
  let service: TimerEntriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TimerEntriesService],
    }).compile();

    service = module.get<TimerEntriesService>(TimerEntriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
