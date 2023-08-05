import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Timer } from 'src/timers/timer.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

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
