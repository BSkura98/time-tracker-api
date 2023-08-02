import { InputType, Int, Field } from '@nestjs/graphql';
import { IsDate, IsOptional } from 'class-validator';

@InputType()
export class CreateTimerEntryInput {
  @IsDate()
  @Field()
  startTime: Date;

  @IsOptional()
  @IsDate()
  @Field({ nullable: true })
  endTime?: Date;

  @Field((type) => Int, { nullable: true })
  timerId?: number;

  @Field({ nullable: true })
  timerName?: string;
}
