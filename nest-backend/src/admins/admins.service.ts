import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsRelations, FindOptionsSelect, Repository } from 'typeorm';

import { Admin } from './entities/admin.entity';
import { CreateAdminInputDto } from './dto/create-admin.dto';
import { User } from 'src/users/entities/user.entity';
import { BaseTypeORMService } from 'src/common/services/base-typeorm.service';

@Injectable()
export class AdminsService extends BaseTypeORMService<Admin> {
  constructor(
    @InjectRepository(Admin)
    private readonly adminRepository: Repository<Admin>,
  ) {
    super(adminRepository);
  }

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

  async findByUserId(
    userId: number,
    relations?: FindOptionsRelations<Admin>,
    select?: FindOptionsSelect<Admin>,
  ) {
    return this.adminRepository.findOne({
      where: {
        user: { id: userId },
      },
      relations,
      select,
    });
  }
}
