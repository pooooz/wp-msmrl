import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IncomingHttpHeaders } from 'http';
import { HydratedDocument } from 'mongoose';

@Schema({
  collection: 'http-logs',
  timestamps: true,
})
export class HttpLog {
  @Prop({ required: true })
  url: string;

  @Prop({ required: true })
  method: string;

  @Prop({ required: true })
  userAgent: string;

  @Prop({ required: true })
  requestIp: string;

  @Prop()
  authorization?: string;

  @Prop({ required: true })
  host: string;

  @Prop({ required: true })
  statusCode: number;

  @Prop({ required: true })
  contentLength: string;
}

export type HttpLogDocument = HydratedDocument<HttpLog>;
export const HttpLogSchema = SchemaFactory.createForClass(HttpLog);
