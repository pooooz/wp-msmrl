import { Injectable } from '@nestjs/common';
import { CreateUserInputDto } from './dto/create-user.dto';
import { UpdateUserInputDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsRelations, FindOptionsSelect, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserInputDto: CreateUserInputDto) {
    const user = this.userRepository.create(createUserInputDto);
    return this.userRepository.save(user);
  }

  async findAll() {
    return this.userRepository.find();
  }

  async findById(
    id: number,
    relations?: FindOptionsRelations<User>,
    select?: FindOptionsSelect<User>,
  ): Promise<User | null> {
    return this.userRepository.findOne({
      where: {
        id,
      },
      relations,
      select,
    });
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

  async update(id: number, updateUserInputDto: UpdateUserInputDto) {
    return this.userRepository.save({
      id,
      ...updateUserInputDto,
    });
  }

  async remove(id: number) {
    return this.userRepository.delete(id);
  }

  public getRepository() {
    return this.userRepository;
  }
}
