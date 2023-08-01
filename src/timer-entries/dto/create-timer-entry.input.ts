import { InputType, Int, Field } from '@nestjs/graphql';
import { IsDate } from 'class-validator';

@InputType()
export class CreateTimerEntryInput {
  @IsDate()
  @Field()
  startTime: Date;

  @IsDate()
  @Field()
  endTime: Date;

  @Field((type) => Int, { nullable: true })
  timerId?: number;

  @Field({ nullable: true })
  timerName?: string;
}
