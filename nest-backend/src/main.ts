import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import {
  DocumentBuilder,
  SwaggerDocumentOptions,
  SwaggerModule,
} from '@nestjs/swagger';
import { UsersModule } from './users/users.module';
import { User } from './users/entities/user.entity';
import { AuthModule } from './auth/auth.module';
import { DisciplinesModule } from './disciplines/disciplines.module';
import { Discipline } from './disciplines/entities/discipline.entity';
import { AdminsModule } from './admins/admins.module';
import { Admin } from './admins/entities/admin.entity';
import { TeachersModule } from './teachers/teachers.module';
import { Teacher } from './teachers/entities/teacher.entity';

const DEFAULT_PORT = 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.enableCors({
    origin: configService.get('whitelistArray'),
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Coupons service')
    .setDescription('The coupons API description')
    .setVersion('1.0')
    .addTag('users')
    .addTag('coupons')
    .addTag('reviews')
    .build();

  const options: SwaggerDocumentOptions = {
    include: [
      UsersModule,
      AuthModule,
      DisciplinesModule,
      AdminsModule,
      TeachersModule,
    ],
    extraModels: [User, Discipline, Admin, Teacher],
    deepScanRoutes: true,
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(configService.get('port') || DEFAULT_PORT);
}

bootstrap();
