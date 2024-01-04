import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { HttpLog } from './schemas/http-log.schema';
import { DatabaseLog } from './schemas/database-log.schema';
import { isDatabaseLog, isHttpLog } from './utils';

@Injectable()
export class EventLoggerService {
  private readonly logger = new Logger(EventLoggerService.name);

  constructor(
    @InjectModel(HttpLog.name) private readonly httpLogModel: Model<HttpLog>,

    @InjectModel(DatabaseLog.name)
    private readonly databaseLogModel: Model<DatabaseLog>,
  ) {}

  public logEvent(logEvent: HttpLog | DatabaseLog) {
    if (isHttpLog(logEvent)) {
      const { url, method, userAgent, requestIp, statusCode, contentLength } =
        logEvent;

      this.logger.log(
        `${method} ${url} ${statusCode} ${contentLength} - ${userAgent} ${requestIp}`,
      );

      new this.httpLogModel(logEvent)
        .save()
        .catch((error) => this.logger.error(error));

      return;
    }

    if (isDatabaseLog(logEvent)) {
      new this.databaseLogModel(logEvent)
        .save()
        .catch((error) => this.logger.error(error));
      return;
    }

    this.logger.error('Unknow type of log event');
  }
}
