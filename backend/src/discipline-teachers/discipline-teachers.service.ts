import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { DisciplineTeacher } from './entities/discipline-teachers.entity';
import { CreateDisciplineTeacherInputDto } from './dto/create-discipline-teacher.dto';
import { CurrentDiscipline } from 'src/current-disciplines/entities/current-discipline.entity';
import { Teacher } from 'src/teachers/entities/teacher.entity';
import { BaseTypeORMService } from 'src/common/services/base-typeorm.service';

@Injectable()
export class DisciplineTeachersService extends BaseTypeORMService<DisciplineTeacher> {
  constructor(
    @InjectRepository(DisciplineTeacher)
    private readonly disciplineTeacherRepository: Repository<DisciplineTeacher>,
  ) {
    super(disciplineTeacherRepository);
  }

  async create(
    createDisciplineTeacherInputDto: CreateDisciplineTeacherInputDto,
    currentDiscipline: CurrentDiscipline,
    teacher: Teacher,
  ) {
    const disciplineTeacher = this.disciplineTeacherRepository.create({
      ...createDisciplineTeacherInputDto,
      currentDiscipline,
      teacher,
    });

    return this.disciplineTeacherRepository.save(disciplineTeacher);
  }
}
