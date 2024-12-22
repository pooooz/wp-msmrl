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
  NotFoundException,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { UserRole } from 'src/common/contracts';
import { UserRoleGuard } from 'src/common/guards/user-role.guard';
import { RequiredUserRoles } from 'src/common/decorators/user-role.decorator';
import { ResultsService } from './results.service';
import { Result } from './entities/result.entity';
import { CreateResultInputDto } from './dto/create-result.dto';
import { StudentsService } from 'src/students/students.service';
import { TasksService } from 'src/tasks/tasks.service';
import { UpdateResultInputDto } from './dto/update-result.dto';
import { DeepPartial } from 'typeorm';
import { DisciplinesService } from 'src/disciplines/disciplines.service';

@ApiBearerAuth()
@UseGuards(UserRoleGuard)
@ApiTags('results')
@Controller('results')
export class ResultsController {
  constructor(
    private readonly resultsService: ResultsService,
    private readonly studentsService: StudentsService,
    private readonly tasksService: TasksService,
    private readonly disciplinesService: DisciplinesService,
  ) {}

  @Post()
  @RequiredUserRoles(UserRole.Teacher)
  @ApiOperation({ summary: 'Create result' })
  @ApiResponse({
    status: 201,
    description: 'Result created',
    type: Result,
  })
  async create(
    @Body() createResultInputDto: CreateResultInputDto,
  ): Promise<Result> {
    const student = await this.studentsService.findById(
      createResultInputDto.studentId,
    );

    if (!student) {
      throw new BadRequestException(
        `Student with id (${createResultInputDto.studentId}) does not exist`,
      );
    }

    const task = await this.tasksService.findById(createResultInputDto.taskId);

    if (!task) {
      throw new BadRequestException(
        `Task with id (${createResultInputDto.studentId}) does not exist`,
      );
    }

    return this.resultsService.create(createResultInputDto, student, task);
  }

  @Get()
  @RequiredUserRoles(UserRole.Admin, UserRole.Teacher)
  @ApiOperation({ summary: 'Find all results' })
  @ApiResponse({
    status: 200,
    description: 'All results',
    type: Array<Result>,
  })
  async findAll() {
    const results = await this.resultsService.findAll({
      task: true,
    });

    const resolvedResults = [];
    for await (const result of results) {
      const correspondingStudent = this.studentsService.findById(
        result.studentId,
      );

      resolvedResults.push({ ...result, student: correspondingStudent });
    }

    return resolvedResults;
  }

  @Get(':id')
  @RequiredUserRoles(UserRole.Admin, UserRole.Teacher)
  @ApiOperation({ summary: 'Find result' })
  @ApiResponse({
    status: 200,
    description: 'Find result by id',
    type: Result,
  })
  async findOne(@Param('id') id: string) {
    const result = await this.resultsService.findById(Number(id), {
      task: true,
    });

    if (!result) {
      throw new NotFoundException('Result with this id does not exists');
    }

    const correspondingStudent = await this.studentsService.findById(
      result.studentId,
    );

    return { ...result, student: correspondingStudent };
  }

  @Get('/tasks/:taskId')
  @RequiredUserRoles(UserRole.Admin, UserRole.Teacher)
  @ApiOperation({ summary: 'Find results by task id' })
  @ApiResponse({
    status: 200,
    description: 'Find results by task id',
    type: Array<Result>,
  })
  async findByTaskId(@Param('taskId') taskId: string) {
    const results = await this.resultsService.find({
      task: { id: Number(taskId) },
    });

    const resolvedResults = [];
    for await (const result of results) {
      const correspondingStudent = await this.studentsService.findById(
        result.studentId,
      );

      resolvedResults.push({ ...result, student: correspondingStudent });
    }

    return resolvedResults;
  }

  @Get('/students/:studentId')
  @RequiredUserRoles(UserRole.Admin, UserRole.Teacher)
  @ApiOperation({ summary: 'Find results by student id' })
  @ApiResponse({
    status: 200,
    description: 'Find results by student id',
    type: Array<Result>,
  })
  async findByStudentId(@Param('studentId') studentId: string) {
    const results = await this.resultsService.find(
      { studentId: Number(studentId) },
      {
        task: {
          currentDiscipline: true,
        },
      },
    );

    const resolvedTasks = [];
    for await (const result of results) {
      const correspondingDescipline = await this.disciplinesService.findById(
        result.task.currentDiscipline.disciplineId,
      );

      if (!correspondingDescipline) {
        throw new BadRequestException(
          `Current discipline with id (${result.task.currentDiscipline.id}) does not have discipline stored. Discipline id (${result.task.currentDiscipline.disciplineId})`,
        );
      }

      resolvedTasks.push({
        ...result,
        task: {
          ...result.task,
          currentDiscipline: {
            ...result.task.currentDiscipline,
            discipline: correspondingDescipline,
          },
        },
      });
    }

    return resolvedTasks;
  }

  @Patch(':id')
  @RequiredUserRoles(UserRole.Admin)
  async update(
    @Param('id') id: string,
    @Body() updateResultInputDto: UpdateResultInputDto,
  ) {
    const { studentId, taskId, ...updateResultInputDtoRest } =
      updateResultInputDto;

    const updateDto: DeepPartial<Result> = {
      ...updateResultInputDtoRest,
    };

    if (studentId) {
      const student = await this.studentsService.findById(studentId);

      if (!student) {
        throw new BadRequestException(
          `Student discipline with id (${studentId}) does not exist`,
        );
      }

      updateDto.studentId = student.id;
    }

    if (taskId) {
      const task = await this.tasksService.findById(taskId);

      if (!task) {
        throw new BadRequestException(
          `Task with id (${taskId}) does not exist`,
        );
      }

      updateDto.task = task;
    }

    return this.resultsService.update(Number(id), updateDto);
  }

  @RequiredUserRoles(UserRole.Admin)
  async remove(@Param('id') id: string) {
    return this.resultsService.remove(Number(id));
  }
}
