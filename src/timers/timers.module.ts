import { Module } from '@nestjs/common';
import { TimersService } from './timers.service';
import { TimersResolver } from './timers.resolver';

@Module({
  providers: [TimersService, TimersResolver],
})
export class TimersModule {}
