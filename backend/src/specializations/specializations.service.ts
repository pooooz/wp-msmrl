import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Specialization } from './entities/specialization.entity';
import { CreateSpecializationInputDto } from './dto/create-specialization.dto';
import { BaseTypeORMService } from 'src/common/services/base-typeorm.service';

@Injectable()
export class SpecializationsService extends BaseTypeORMService<Specialization> {
  constructor(
    @InjectRepository(Specialization)
    private readonly specializationRepository: Repository<Specialization>,
  ) {
    super(specializationRepository);
  }

  async create(createSpecializationInputDto: CreateSpecializationInputDto) {
    const specialization = this.specializationRepository.create({
      ...createSpecializationInputDto,
    });

    return this.specializationRepository.save(specialization);
  }
}
