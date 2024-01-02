import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

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

  async create(createAdminInputDto: CreateTeacherInputDto, user: User) {
    const admin = this.teacherRepository.create({
      ...createAdminInputDto,
      user,
    });
    const createdAdmin = await this.teacherRepository.save(admin);

    const adminWithoutPassword = {
      ...createdAdmin,
      user: {
        ...createdAdmin.user,
        // Hide password, but follow contracts
        password: '',
      },
    };

    return adminWithoutPassword;
  }
}
