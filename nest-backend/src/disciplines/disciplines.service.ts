import { Injectable } from '@nestjs/common';
import { CreateDisciplineInputDto } from './dto/create-discipline.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FindOptionsRelations, FindOptionsSelect, Repository } from 'typeorm';
import { Discipline } from './entities/discipline.entity';
import { UpdateDisciplineInputDto } from './dto/update-discipline.dto';

@Injectable()
export class DisciplinesService {
  constructor(
    @InjectRepository(Discipline)
    private readonly disciplineRepository: Repository<Discipline>,
  ) {}

  async create(createDisciplineInputDto: CreateDisciplineInputDto) {
    const discipline = this.disciplineRepository.create(
      createDisciplineInputDto,
    );
    return this.disciplineRepository.save(discipline);
  }

  async findAll() {
    return this.disciplineRepository.find();
  }

  async findById(
    id: number,
    relations?: FindOptionsRelations<Discipline>,
    select?: FindOptionsSelect<Discipline>,
  ): Promise<Discipline | null> {
    return this.disciplineRepository.findOne({
      where: {
        id,
      },
      relations,
      select,
    });
  }

  async update(id: number, updateDisciplineInputDto: UpdateDisciplineInputDto) {
    return this.disciplineRepository.save({
      id,
      ...updateDisciplineInputDto,
    });
  }

  async remove(id: number) {
    return this.disciplineRepository.delete(id);
  }

  public getRepository() {
    return this.disciplineRepository;
  }
}
