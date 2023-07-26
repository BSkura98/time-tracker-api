import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class CreateTimerInput {
  @Field()
  name: string;
}
