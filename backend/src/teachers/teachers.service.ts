import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsRelations, FindOptionsSelect, Repository } from 'typeorm';

import { Teacher } from './entities/teacher.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateTeacherInputDto } from './dto/create-teacher.dto';
import { BaseTypeORMService } from 'src/common/services/base-typeorm.service';

@Injectable()
export class TeachersService extends BaseTypeORMService<Teacher> {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) {
    super(teacherRepository);
  }

  async create(createTeacherInputDto: CreateTeacherInputDto, user: User) {
    const teacher = this.teacherRepository.create({
      ...createTeacherInputDto,
      user,
    });
    const createdTeacher = await this.teacherRepository.save(teacher);

    const teacherWithoutPassword = {
      ...createdTeacher,
      user: {
        ...createdTeacher.user,
        // Hide password, but follow contracts
        password: '',
      },
    };

    return teacherWithoutPassword;
  }

  async findByUserId(
    userId: number,
    relations?: FindOptionsRelations<Teacher>,
    select?: FindOptionsSelect<Teacher>,
  ) {
    return this.teacherRepository.findOne({
      where: {
        user: { id: userId },
      },
      relations,
      select,
    });
  }
}
