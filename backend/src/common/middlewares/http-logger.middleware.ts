import { Inject, Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

import { HttpLog } from '../../event-logger/schemas/http-log.schema';
import { EventLoggerService } from '../../event-logger/event-logger.service';

@Injectable()
export class HttpLoggerMiddleware implements NestMiddleware {
  constructor(
    @Inject(EventLoggerService)
    private readonly eventLoggerService: EventLoggerService,
  ) {}

  use(request: Request, response: Response, next: NextFunction) {
    const { ip, method, originalUrl: url, headers } = request;
    const { authorization, host } = headers;

    const userAgent = request.get('user-agent') || '';

    response.on('finish', () => {
      const { statusCode } = response;
      const contentLength = response.get('content-length');

      const httpLogEvent: HttpLog = {
        url,
        method,
        userAgent,
        requestIp: ip || '',
        authorization,
        host: host || 'undefined',
        statusCode,
        contentLength: contentLength || '0',
      };

      this.eventLoggerService.logEvent(httpLogEvent);
    });

    next();
  }
}
