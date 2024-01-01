import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsRelations, FindOptionsSelect, Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
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

  async update(id: number, updateUserDto: UpdateUserDto) {
    return this.userRepository.save({
      id,
      ...updateUserDto,
    });
  }

  async remove(id: number) {
    return this.userRepository.delete(id);
  }

  public getRepository() {
    return this.userRepository;
  }
}
