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

@ApiBearerAuth()
@UseGuards(UserRoleGuard)
@ApiTags('results')
@Controller('results')
export class ResultsController {
  constructor(
    private readonly resultsService: ResultsService,
    private readonly studentsService: StudentsService,
    private readonly tasksService: TasksService,
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
  findAll() {
    return this.resultsService.findAll({ student: true, task: true });
  }

  @Get(':id')
  @RequiredUserRoles(UserRole.Admin, UserRole.Teacher)
  @ApiOperation({ summary: 'Find result' })
  @ApiResponse({
    status: 200,
    description: 'Find result by id',
    type: Result,
  })
  findOne(@Param('id') id: string) {
    return this.resultsService.findById(Number(id), {
      student: true,
      task: true,
    });
  }

  @Patch(':id')
  @RequiredUserRoles(UserRole.Admin)
  async update(
    @Param('id') id: string,
    @Body() updateResultInputDto: UpdateResultInputDto,
  ) {
    return this.resultsService.update(Number(id), updateResultInputDto);
  }

  @Delete(':id')
  @RequiredUserRoles(UserRole.Admin)
  async remove(@Param('id') id: string) {
    return this.resultsService.remove(Number(id));
  }
}
