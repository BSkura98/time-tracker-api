import { InputType, Int, Field } from '@nestjs/graphql';
import { IsDate, IsOptional } from 'class-validator';

@InputType()
export class FilterTimerEntryInput {
  @IsOptional()
  @IsDate()
  @Field({ nullable: true })
  startTimeDay?: Date;
}
