import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsRelations, FindOptionsSelect, Repository } from 'typeorm';
import { Admin } from './entities/admin.entity';
import { CreateAdminInputDto } from './dto/create-admin.dto';
import { UpdateAdminInputDto } from './dto/update-admin.dto';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class AdminsService {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {}

  async create(createAdminInputDto: CreateAdminInputDto, user: User) {
    const admin = this.adminRepository.create({
      ...createAdminInputDto,
      user,
    });
    const createdAdmin = await this.adminRepository.save(admin);

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
    relations?: FindOptionsRelations<Admin>,
    select?: FindOptionsSelect<Admin>,
  ) {
    return this.adminRepository.find({
      relations,
      select,
    });
  }

  async findById(
    id: number,
    relations?: FindOptionsRelations<Admin>,
    select?: FindOptionsSelect<Admin>,
  ): Promise<Admin | null> {
    return this.adminRepository.findOne({
      where: {
        id,
      },
      relations,
      select,
    });
  }

  async update(id: number, updateAdminInputDto: UpdateAdminInputDto) {
    return this.adminRepository.save({
      id,
      ...updateAdminInputDto,
    });
  }

  async remove(id: number) {
    return this.adminRepository.delete(id);
  }

  public getRepository() {
    return this.adminRepository;
  }
}
