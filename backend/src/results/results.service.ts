import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Result } from './entities/result.entity';
import { CreateResultInputDto } from './dto/create-result.dto';
import { Task } from 'src/tasks/entities/tasks.entity';
import {
  GetStudentResponseData,
  Student,
} from 'src/students/entities/student.entity';
import { BaseTypeORMService } from 'src/common/services/base-typeorm.service';

@Injectable()
export class ResultsService extends BaseTypeORMService<Result> {
  constructor(
    @InjectRepository(Result)
    private readonly resultRepository: Repository<Result>,
  ) {
    super(resultRepository);
  }

  async create(
    createResultInputDto: CreateResultInputDto,
    student: GetStudentResponseData,
    task: Task,
  ) {
    const result = this.resultRepository.create({
      ...createResultInputDto,
      studentId: createResultInputDto.studentId,
      task,
    });

    return this.resultRepository.save(result);
  }
}
