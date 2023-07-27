import { CreateTimerEntryInput } from './create-timer-entry.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateTimerEntryInput extends PartialType(CreateTimerEntryInput) {
  @Field(() => Int)
  id: number;
}
