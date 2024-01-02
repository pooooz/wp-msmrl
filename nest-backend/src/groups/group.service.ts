import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Group } from './entities/group.entity';
import { CreateGroupInputDto } from './dto/create-group.dto';
import { Specialization } from 'src/specializations/entities/specialization.entity';
import { BaseTypeORMService } from 'src/common/services/base-typeorm.service';

@Injectable()
export class GroupsService extends BaseTypeORMService<Group> {
  constructor(
    @InjectRepository(Group)
    private readonly groupRepository: Repository<Group>,
  ) {
    super(groupRepository);
  }

  async create(
    createGroupInputDto: CreateGroupInputDto,
    specialization: Specialization,
  ) {
    const group = this.groupRepository.create({
      ...createGroupInputDto,
      specialization,
    });

    return this.groupRepository.save(group);
  }
}
