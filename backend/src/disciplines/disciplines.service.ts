import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Discipline } from './entities/discipline.entity';
import { BaseTypeORMService } from 'src/common/services/base-typeorm.service';

@Injectable()
export class DisciplinesService extends BaseTypeORMService<Discipline> {
  constructor(
    @InjectRepository(Discipline) disciplineRepository: Repository<Discipline>,
  ) {
    super(disciplineRepository);
  }
}
