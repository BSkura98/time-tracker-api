import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

import { CreateTimerInput } from './create-timer.input';

@InputType()
export class UpdateTimerInput extends PartialType(CreateTimerInput) {
  @Field(() => Int)
  id: number;
}
