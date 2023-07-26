import { Field, Int, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Timer {
  @Field((type) => Int)
  id: number;

  @Field()
  name: string;
}
