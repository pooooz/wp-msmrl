import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CurrentDiscipline } from './entities/current-discipline.entity';
import { CreateCurrentDisciplineInputDto } from './dto/create-current-discipline.dto';
import { Group } from 'src/groups/entities/group.entity';
import {
  Discipline,
  GetDisciplineResponseData,
} from 'src/disciplines/entities/discipline.entity';
import { BaseTypeORMService } from 'src/common/services/base-typeorm.service';

@Injectable()
export class CurrentDisciplinesService extends BaseTypeORMService<CurrentDiscipline> {
  constructor(
    @InjectRepository(CurrentDiscipline)
    private readonly currentDisciplineRepository: Repository<CurrentDiscipline>,
  ) {
    super(currentDisciplineRepository);
  }

  async create(
    createCurrentDisciplineInputDto: CreateCurrentDisciplineInputDto,
    discipline: GetDisciplineResponseData,
    group: Group,
  ) {
    const currentDiscipline = await this.currentDisciplineRepository.create({
      group,
      year: createCurrentDisciplineInputDto.year,
      disciplineId: createCurrentDisciplineInputDto.disciplineId,
    });

    return await this.currentDisciplineRepository.save(currentDiscipline);
  }
}
