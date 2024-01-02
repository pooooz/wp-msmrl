import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  UseGuards,
  Req,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { Request } from 'express';

import { DisciplineControlForm, UserRole } from 'src/common/contracts';
import { UserRoleGuard } from 'src/common/guards/user-role.guard';
import { RequiredUserRoles } from 'src/common/decorators/user-role.decorator';
import { TasksService } from './tasks.service';
import { CurrentDisciplinesService } from 'src/current-disciplines/current-disciplines.service';
import { Task } from './entities/tasks.entity';
import { CreateTaskInputDto } from './dto/create-tasks.dto';
import { TeachersService } from 'src/teachers/teachers.service';
import { TaskEvaluationScale } from 'src/common/contracts/enums/task-evaluation-scale.enum';
import { UpdateTaskInputDto } from './dto/update-tasks.dto';

@ApiBearerAuth()
@UseGuards(UserRoleGuard)
@RequiredUserRoles(UserRole.Teacher)
@ApiTags('tasks')
@Controller('tasks')
export class TasksController {
  constructor(
    private readonly tasksService: TasksService,
    private readonly currentDisciplinesService: CurrentDisciplinesService,
    private readonly teachersService: TeachersService,
  ) {}

  @Post()
  @RequiredUserRoles(UserRole.Teacher)
  @ApiOperation({ summary: 'Create task' })
  @ApiResponse({
    status: 201,
    description: 'Task created',
    type: Task,
  })
  async create(
    @Body() createTaskInputDto: CreateTaskInputDto,
    @Req() request: Request,
  ): Promise<Task> {
    const { user } = request;

    const currentDiscipline = await this.currentDisciplinesService.findById(
      createTaskInputDto.currentDisciplineId,
      { discipline: true },
    );

    if (!currentDiscipline) {
      throw new BadRequestException(
        `Current task with id (${createTaskInputDto.currentDisciplineId}) does not exist`,
      );
    }

    const teacher = await this.teachersService.findById(Number(user?.sub));

    if (!teacher) {
      throw new BadRequestException(
        `Teacher task with id (${user?.sub}) does not exist`,
      );
    }

    let evaluationScale: TaskEvaluationScale = TaskEvaluationScale.TenPoint;
    switch (currentDiscipline.discipline.controlForm) {
      case DisciplineControlForm.Exam:
      case DisciplineControlForm.DifferentiatedCredit: {
        evaluationScale = TaskEvaluationScale.TenPoint;
        break;
      }
      case DisciplineControlForm.Credit: {
        evaluationScale = TaskEvaluationScale.Credit;
        break;
      }
      default: {
        evaluationScale = TaskEvaluationScale.TenPoint;
        break;
      }
    }

    const candidate = await this.tasksService.findOne({
      name: createTaskInputDto.name,
      currentDiscipline: { id: createTaskInputDto.currentDisciplineId },
      creator: { id: teacher.id },
      evaluationScale,
      mandatory: createTaskInputDto.mandatory,
    });

    if (candidate) {
      throw new BadRequestException('Such a task already exists');
    }

    return this.tasksService.create(
      createTaskInputDto,
      currentDiscipline,
      teacher,
    );
  }

  @Get()
  @RequiredUserRoles(UserRole.Admin, UserRole.Teacher)
  @ApiOperation({ summary: 'Find all tasks' })
  @ApiResponse({
    status: 200,
    description: 'All tasks',
    type: Array<Task>,
  })
  findAll() {
    return this.tasksService.findAll({
      currentDiscipline: true,
      creator: true,
    });
  }

  @Get(':id')
  @RequiredUserRoles(UserRole.Admin, UserRole.Teacher)
  @ApiOperation({ summary: 'Find task' })
  @ApiResponse({
    status: 200,
    description: 'Find task by id',
    type: Task,
  })
  findOne(@Param('id') id: string) {
    return this.tasksService.findById(Number(id), {
      currentDiscipline: true,
      creator: true,
    });
  }

  @Patch(':id')
  @RequiredUserRoles(UserRole.Teacher)
  async update(
    @Param('id') id: string,
    @Body() updateTaskInputDto: UpdateTaskInputDto,
  ) {
    return this.tasksService.update(Number(id), updateTaskInputDto);
  }

  @Delete(':id')
  @RequiredUserRoles(UserRole.Teacher)
  async remove(@Param('id') id: string) {
    return this.tasksService.remove(Number(id));
  }
}
