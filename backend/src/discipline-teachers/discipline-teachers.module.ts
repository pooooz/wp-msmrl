import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { DisciplineTeacher as DisciplineTeacherEnity } from './entities/discipline-teachers.entity';
import { DisciplineTeachersController } from './discipline-teachers.controller';
import { DisciplineTeachersService } from './discipline-teachers.service';
import { CurrentDisciplinesModule } from 'src/current-disciplines/current-disciplines.module';
import { TeachersModule } from 'src/teachers/teachers.module';
import { DisciplinesModule } from 'src/disciplines/disciplines.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([DisciplineTeacherEnity]),
    CurrentDisciplinesModule,
    TeachersModule,
    DisciplinesModule,
  ],
  controllers: [DisciplineTeachersController],
  providers: [DisciplineTeachersService],
  exports: [DisciplineTeachersService],
})
export class DisciplineTeachersModule {}
