import { Logger as TypeOrmLogger } from 'typeorm';
import { Logger as NestLogger } from '@nestjs/common';

class DatabaseLogger implements TypeOrmLogger {
  private readonly logger = new NestLogger('Database');

  logQuery(query: string, parameters?: unknown[]) {
    this.logger.debug(`${query}`);
  }

  logQueryError(error: string, query: string, parameters?: unknown[]) {
    this.logger.error(`${query} -- ${error}`);
  }

  logQuerySlow(time: number, query: string, parameters?: unknown[]) {
    this.logger.warn(`Time: ${time} -- ${query}`);
  }

  logMigration(message: string) {
    this.logger.log(message);
  }

  logSchemaBuild(message: string) {
    this.logger.log(message);
  }

  log(level: 'log' | 'info' | 'warn', message: string) {
    if (level === 'log') {
      return this.logger.log(message);
    }
    if (level === 'info') {
      return this.logger.log(message);
    }
    if (level === 'warn') {
      return this.logger.warn(message);
    }
  }

  private stringifyParameters(parameters?: unknown[]) {
    try {
      return JSON.stringify(parameters);
    } catch {
      return '';
    }
  }
}

export default DatabaseLogger;
