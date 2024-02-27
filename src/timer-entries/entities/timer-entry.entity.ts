import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { Timer } from '../../timers/timer.entity';

@Entity()
@ObjectType()
export class TimerEntry {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  startTime: Date;

  @Column({ nullable: true })
  @Field({ nullable: true })
  endTime?: Date;

  @Column()
  @Field((type) => Int)
  timerId: number;

  @ManyToOne(() => Timer, (timer) => timer.entries)
  @Field((type) => Timer)
  timer: Timer;
}
