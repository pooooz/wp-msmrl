import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsRelations, FindOptionsSelect, Repository } from 'typeorm';
import { Teacher } from './entities/teacher.entity';
import { User } from 'src/users/entities/user.entity';
import { CreateTeacherInputDto } from './dto/create-teacher.dto';
import { UpdateTeacherInputDto } from './dto/update-teacher.dto';

@Injectable()
export class TeachersService {
  constructor(
    @InjectRepository(Teacher)
    private readonly teacherRepository: Repository<Teacher>,
  ) {}

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

  async findAll(
    relations?: FindOptionsRelations<Teacher>,
    select?: FindOptionsSelect<Teacher>,
  ) {
    return this.teacherRepository.find({
      relations,
      select,
    });
  }

  async findById(
    id: number,
    relations?: FindOptionsRelations<Teacher>,
    select?: FindOptionsSelect<Teacher>,
  ): Promise<Teacher | null> {
    return this.teacherRepository.findOne({
      where: {
        id,
      },
      relations,
      select,
    });
  }

  async update(id: number, updateAdminInputDto: UpdateTeacherInputDto) {
    return this.teacherRepository.save({
      id,
      ...updateAdminInputDto,
    });
  }

  async remove(id: number) {
    return this.teacherRepository.delete(id);
  }

  public getRepository() {
    return this.teacherRepository;
  }
}
