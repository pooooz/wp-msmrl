import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Result as ResultEnity } from './entities/result.entity';
import { ResultsController } from './results.controller';
import { ResultsService } from './results.service';
import { StudentsModule } from 'src/students/students.module';
import { TasksModule } from 'src/tasks/tasks.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ResultEnity]),
    StudentsModule,
    TasksModule,
  ],
  controllers: [ResultsController],
  providers: [ResultsService],
  exports: [ResultsService],
})
export class ResultsModule {}
