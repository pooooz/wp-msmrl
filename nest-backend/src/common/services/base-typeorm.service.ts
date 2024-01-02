import { Injectable } from '@nestjs/common';
import {
  DeepPartial,
  FindOptionsRelations,
  FindOptionsSelect,
  FindOptionsWhere,
  Repository,
} from 'typeorm';

@Injectable()
export abstract class BaseTypeORMService<Entity extends { id: number }> {
  constructor(private readonly entityRepository: Repository<Entity>) {}

  async create(createInputDto: DeepPartial<Entity>, ...rest: unknown[]) {
    const entity = this.entityRepository.create(createInputDto);

    return this.entityRepository.save(entity);
  }

  async findAll(
    relations?: FindOptionsRelations<Entity>,
    select?: FindOptionsSelect<Entity>,
  ) {
    return this.entityRepository.find({
      relations,
      select,
    });
  }

  async findOne(
    where?: FindOptionsWhere<Entity>,
    relations?: FindOptionsRelations<Entity>,
    select?: FindOptionsSelect<Entity>,
  ) {
    return this.entityRepository.findOne({
      where,
      relations,
      select,
    });
  }

  async find(
    where?: FindOptionsWhere<Entity>,
    relations?: FindOptionsRelations<Entity>,
    select?: FindOptionsSelect<Entity>,
  ) {
    return this.entityRepository.find({
      where,
      relations,
      select,
    });
  }

  async findById(
    id: number,
    relations?: FindOptionsRelations<Entity>,
    select?: FindOptionsSelect<Entity>,
  ): Promise<Entity | null> {
    return this.entityRepository.findOne({
      where: {
        id,
      } as FindOptionsWhere<Entity>,
      relations,
      select,
    });
  }

  async update(id: number, updateStudentInputDto: DeepPartial<Entity>) {
    return this.entityRepository.save({
      id,
      ...updateStudentInputDto,
    });
  }

  async remove(id: number) {
    return this.entityRepository.delete(id);
  }

  public getRepository() {
    return this.entityRepository;
  }
}
