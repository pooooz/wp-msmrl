import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Task as TaskEnity } from './entities/tasks.entity';
import { TasksController } from './tasks.controller';
import { TasksService } from './tasks.service';
import { CurrentDisciplinesModule } from 'src/current-disciplines/current-disciplines.module';
import { TeachersModule } from 'src/teachers/teachers.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TaskEnity]),
    CurrentDisciplinesModule,
    TeachersModule,
  ],
  controllers: [TasksController],
  providers: [TasksService],
  exports: [TasksService],
})
export class TasksModule {}
