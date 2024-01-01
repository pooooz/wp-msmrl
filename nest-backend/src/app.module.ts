import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';

import configuration from './constants/configuration';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users/entities/user.entity';
import { HttpLoggerMiddleware } from './common/middlewares/http-logger.middleware';
import { DatabaseLogger } from './database.logger';
import { EventLoggerModule } from './event-logger/event-logger.module';

import { EventLoggerService } from './event-logger/event-logger.service';
import { DisciplinesModule } from './disciplines/disciplines.module';
import { Discipline } from './disciplines/entities/discipline.entity';
import { AdminsModule } from './admins/admins.module';
import { Admin } from './admins/entities/admin.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get('mongodb').store,
      }),
    }),
    EventLoggerModule,
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, EventLoggerModule],
      inject: [ConfigService, EventLoggerService],

      useFactory: async (
        configService: ConfigService,
        eventLoggerService: EventLoggerService,
      ) => {
        const postgresConfig = configService.get('postgres');

        const entities = [User, Discipline, Admin];

        return {
          type: 'postgres',
          host: postgresConfig.host,
          port: postgresConfig.port,
          username: postgresConfig.username,
          password: postgresConfig.password,
          database: postgresConfig.database,
          entities,
          synchronize: true,
          logging: ['query', 'error'],
          logger: new DatabaseLogger(eventLoggerService),
        };
      },
    }),
    UsersModule,
    AuthModule,
    DisciplinesModule,
    AdminsModule,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(HttpLoggerMiddleware).forRoutes('*');
  }
}
