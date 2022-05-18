import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { CoreSchema } from './../../common/schemas/core.schema';
import { ObjectType, InputType, Field } from '@nestjs/graphql';
import { IsMongoId, IsOptional, IsString, MaxLength } from 'class-validator';
import { schemaOption } from './../../common/schemas/option.schema';
import { Section, SectionSchema } from './section.schema';

export type TemplateDocument = Template & Document;

@InputType('TemplateInputType', { isAbstract: true })
@ObjectType()
@Schema(schemaOption)
export class Template extends CoreSchema {
  @Field((type) => String)
  @IsMongoId()
  _id: string;

  @Field((type) => String)
  @Prop({ type: String, required: true, trim: true, maxlength: 50 })
  @IsString()
  @MaxLength(50)
  title: string;

  @Field((type) => String, { nullable: true })
  @Prop({ type: String, maxlength: 300 })
  @IsString()
  @MaxLength(300)
  @IsOptional()
  description?: string;

  @Field((type) => [Section], { nullable: true })
  @Prop({ type: [SectionSchema] })
  sections?: Section[];
}

export const TemplateSchema = SchemaFactory.createForClass(Template);
