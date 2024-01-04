import { DatabaseLog } from './schemas/database-log.schema';
import { HttpLog } from './schemas/http-log.schema';

export function isHttpLog(logEvent: any): logEvent is HttpLog {
  return (logEvent as HttpLog)?.url !== undefined;
}

export function isDatabaseLog(logEvent: any): logEvent is DatabaseLog {
  const databaseLog = logEvent as DatabaseLog;
  return databaseLog?.query !== undefined;
}
