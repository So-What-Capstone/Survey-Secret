import { SchemaOptions } from '@nestjs/mongoose';

export const schemaOption: SchemaOptions = {
  timestamps: true,
};

export const schemaOptionExceptDate: SchemaOptions = {};
