import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TimersModule } from 'src/timers/timers.module';
import { TimerEntriesService } from './timer-entries.service';
import { TimerEntriesResolver } from './timer-entries.resolver';
import { TimerEntry } from './entities/timer-entry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TimerEntry]), TimersModule],
  providers: [TimerEntriesResolver, TimerEntriesService],
})
export class TimerEntriesModule {}
