import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@Schema({
  collection: 'database-logs',
  timestamps: true,
})
export class DatabaseLog {
  @Prop({ required: true })
  query: string;

  @Prop()
  parametrs?: string;

  @Prop()
  error?: string;
}

export type DatabaseLogDocument = HydratedDocument<DatabaseLog>;
export const DatabaseLogSchema = SchemaFactory.createForClass(DatabaseLog);
