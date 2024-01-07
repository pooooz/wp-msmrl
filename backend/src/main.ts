import { NestFactory, PartialGraphHost } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';
import * as cookieParser from 'cookie-parser';
import * as fs from 'fs';
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
import { CurrentDiscipline } from './current-disciplines/entities/current-discipline.entity';
import { Group } from './groups/entities/group.entity';
import { CurrentDisciplinesModule } from './current-disciplines/current-disciplines.module';
import { DisciplineTeachersModule } from './discipline-teachers/discipline-teachers.module';
import { GroupsModule } from './groups/group.module';
import { DisciplineTeacher } from './discipline-teachers/entities/discipline-teachers.entity';
import { TasksModule } from './tasks/tasks.module';
import { Task } from './tasks/entities/tasks.entity';
import { Student } from './students/entities/student.entity';
import { StudentsModule } from './students/students.module';
import { Result } from './results/entities/result.entity';
import { ResultsModule } from './results/results.module';

const DEFAULT_PORT = 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // snapshot: true,
    // abortOnError: false,
  });
  const configService = app.get(ConfigService);

  app.useGlobalPipes(new ValidationPipe());
  app.use(cookieParser());
  app.enableCors({
    origin: configService.get('whitelistArray'),
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('WP MSMRL')
    .setDescription('WP MSMRL description')
    .setVersion('1.0')
    .build();

  const options: SwaggerDocumentOptions = {
    include: [
      UsersModule,
      AuthModule,
      DisciplinesModule,
      AdminsModule,
      TeachersModule,
      CurrentDisciplinesModule,
      DisciplineTeachersModule,
      GroupsModule,
      TasksModule,
      StudentsModule,
      ResultsModule,
    ],
    extraModels: [
      User,
      Discipline,
      Admin,
      Teacher,
      CurrentDiscipline,
      DisciplineTeacher,
      Group,
      Task,
      Student,
      Result,
    ],
    deepScanRoutes: true,
  };

  const document = SwaggerModule.createDocument(app, config, options);
  SwaggerModule.setup('api', app, document);

  console.log('configService.get(port)', configService.get('port'));

  await app.listen(configService.get('port') || DEFAULT_PORT);
}

bootstrap();
