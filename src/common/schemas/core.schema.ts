import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class CoreSchema {
  @Field((type) => Date)
  createdAt: Date;

  @Field((type) => Date)
  updatedAt: Date;
}
