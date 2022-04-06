import { SchemaOptions } from '@nestjs/mongoose';

export const schemaOption: SchemaOptions = {
  timestamps: true,
  autoIndex: true,
};

export const schemaOptionExceptDate: SchemaOptions = {
  autoIndex: true,
};
