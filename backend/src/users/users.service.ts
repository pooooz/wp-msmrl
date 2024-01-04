import { Injectable } from '@nestjs/common';
import { FindOptionsRelations, FindOptionsSelect, Repository } from 'typeorm';

import { CreateUserInputDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { BaseTypeORMService } from 'src/common/services/base-typeorm.service';

@Injectable()
export class UsersService extends BaseTypeORMService<User> {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
    super(userRepository);
  }

  async create(createUserInputDto: CreateUserInputDto) {
    const user = this.userRepository.create(createUserInputDto);
    return this.userRepository.save(user);
  }

  async findByLogin(
    login: string,
    relations?: FindOptionsRelations<User>,
    select?: FindOptionsSelect<User>,
  ): Promise<User | null> {
    return this.userRepository.findOne({
      where: {
        login,
      },
      relations,
      select,
    });
  }
}
