import { Field, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';

@ObjectType()
export class Question {
  @Field((type) => String)
  @Prop({ type: String, trim: true, required: true })
  content: string;

  @Field((type) => String, { nullable: true })
  @Prop({ type: String, trim: true })
  description?: string;

  @Field((type) => Boolean, { nullable: true })
  @Prop({ type: Boolean, default: false })
  required?: boolean;

  @Field((type) => Number)
  @Prop({ type: Number, unique: true })
  order: Number;
}
