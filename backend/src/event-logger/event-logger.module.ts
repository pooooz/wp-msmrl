import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { EventLoggerService } from './event-logger.service';
import { HttpLog, HttpLogSchema } from './schemas/http-log.schema';
import { DatabaseLog, DatabaseLogSchema } from './schemas/database-log.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: HttpLog.name, schema: HttpLogSchema }]),
    MongooseModule.forFeature([
      { name: DatabaseLog.name, schema: DatabaseLogSchema },
    ]),
  ],
  providers: [EventLoggerService],
  exports: [EventLoggerService],
})
export class EventLoggerModule {}
