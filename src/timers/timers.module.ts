import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { TimersService } from './timers.service';
import { TimersResolver } from './timers.resolver';
import { Timer } from './timer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Timer])],
  providers: [TimersService, TimersResolver],
})
export class TimersModule {}
