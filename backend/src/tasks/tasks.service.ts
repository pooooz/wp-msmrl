import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Task } from './entities/tasks.entity';
import { CreateTaskInputDto } from './dto/create-tasks.dto';
import { CurrentDiscipline } from 'src/current-disciplines/entities/current-discipline.entity';
import { Teacher } from 'src/teachers/entities/teacher.entity';
import { BaseTypeORMService } from 'src/common/services/base-typeorm.service';
import { TaskEvaluationScale } from 'src/common/contracts/enums/task-evaluation-scale.enum';

@Injectable()
export class TasksService extends BaseTypeORMService<Task> {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {
    super(taskRepository);
  }

  async create(
    createTaskInputDto: CreateTaskInputDto,
    currentDiscipline: CurrentDiscipline,
    creator: Teacher,
    evaluationScale: TaskEvaluationScale,
  ) {
    const task = this.taskRepository.create({
      ...createTaskInputDto,
      currentDiscipline,
      creator,
      evaluationScale,
    });

    return this.taskRepository.save(task);
  }
}
