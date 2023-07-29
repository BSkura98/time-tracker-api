import { Module, forwardRef } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TimerEntriesModule } from 'src/timer-entries/timer-entries.module';
import { TimersService } from './timers.service';
import { TimersResolver } from './timers.resolver';
import { Timer } from './timer.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Timer]),
    forwardRef(() => TimerEntriesModule),
  ],
  providers: [TimersService, TimersResolver],
  exports: [TimersService],
})
export class TimersModule {}
