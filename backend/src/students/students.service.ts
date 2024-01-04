import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Student } from './entities/student.entity';
import { CreateStudentInputDto } from './dto/create-student.dto';
import { Group } from 'src/groups/entities/group.entity';
import { BaseTypeORMService } from 'src/common/services/base-typeorm.service';

@Injectable()
export class StudentsService extends BaseTypeORMService<Student> {
  constructor(
    @InjectRepository(Student)
    private readonly studentRepository: Repository<Student>,
  ) {
    super(studentRepository);
  }

  async create(createStudentInputDto: CreateStudentInputDto, group: Group) {
    const student = this.studentRepository.create({
      ...createStudentInputDto,
      group,
    });

    return this.studentRepository.save(student);
  }
}
