import { Injectable, Logger as NestLogger } from '@nestjs/common';
import { Logger, QueryRunner } from 'typeorm';
import { DatabaseLog } from './event-logger/schemas/database-log.schema';
import { EventLoggerService } from './event-logger/event-logger.service';

@Injectable()
export class DatabaseLogger implements Logger {
  private readonly logger = new NestLogger(DatabaseLogger.name);

  constructor(private readonly eventLoggerService: EventLoggerService) {}

  private stringifyParameters(parameters?: any[] | undefined) {
    try {
      return JSON.stringify(parameters);
    } catch {
      return '';
    }
  }

  logQuery(
    query: string,
    parameters?: any[] | undefined,
    queryRunner?: QueryRunner | undefined,
  ) {
    const stringParameters = this.stringifyParameters(parameters);

    this.logger.log(
      `${query} ${
        stringParameters ? `-- Parameters: ${stringParameters}` : ''
      }`,
    );

    const databaseLogEvent: DatabaseLog = {
      query,
      parametrs: stringParameters,
    };

    this.eventLoggerService.logEvent(databaseLogEvent);
  }
  logQueryError(
    error: string | Error,
    query: string,
    parameters?: any[] | undefined,
    queryRunner?: QueryRunner | undefined,
  ) {
    const stringParameters = this.stringifyParameters(parameters);

    this.logger.error(
      `${query} ${
        stringParameters ? `-- Parameters: ${stringParameters}` : ''
      } -- ${error}`,
    );

    const databaseLogEvent: DatabaseLog = {
      query,
      parametrs: stringParameters,
      error: String(Error),
    };

    this.eventLoggerService.logEvent(databaseLogEvent);
  }

  logQuerySlow(
    time: number,
    query: string,
    parameters?: any[] | undefined,
    queryRunner?: QueryRunner | undefined,
  ) {
    const stringParameters = this.stringifyParameters(parameters);

    this.logger.warn(
      `Time: ${time} ${
        stringParameters ? `-- Parameters: ${stringParameters}` : ''
      } -- ${query}`,
    );
  }

  logSchemaBuild(message: string, queryRunner?: QueryRunner | undefined) {
    this.logger.log(message);
  }

  logMigration(message: string, queryRunner?: QueryRunner | undefined) {
    this.logger.log(message);
  }

  log(
    level: 'log' | 'info' | 'warn',
    message: any,
    queryRunner?: QueryRunner | undefined,
  ) {
    if (level === 'log') {
      return this.logger.log(message);
    }
    if (level === 'info') {
      return this.logger.debug(message);
    }
    if (level === 'warn') {
      return this.logger.warn(message);
    }
  }
}
