import { SchemaOptions } from '@nestjs/mongoose';

export const schemaOption: SchemaOptions = {
  timestamps: true,
};

export const schemaOptionExceptDate: SchemaOptions = {};

export const virtualSchemaOption: SchemaOptions = {
  toJSON: { virtuals: true },
};
