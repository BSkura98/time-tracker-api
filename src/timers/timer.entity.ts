import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { TimerEntry } from '../timer-entries/entities/timer-entry.entity';

@Entity()
@ObjectType()
export class Timer {
  @PrimaryGeneratedColumn()
  @Field((type) => Int)
  id: number;

  @Column()
  @Field()
  name: string;

  @OneToMany(() => TimerEntry, (entry) => entry.timer)
  @Field((type) => [TimerEntry], { nullable: true })
  entries?: TimerEntry[];
}
