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
import * as bcrypt from 'bcrypt';

import { UserRole } from 'src/common/contracts';
import { UserRoleGuard } from 'src/common/guards/user-role.guard';
import { RequiredUserRoles } from 'src/common/decorators/user-role.decorator';
import { DisciplineTeachersService } from './discipline-teachers.service';
import { DisciplineTeacher } from './entities/discipline-teachers.entity';
import { CreateDisciplineTeacherInputDto } from './dto/create-discipline-teacher.dto';
import { CurrentDisciplinesService } from 'src/current-disciplines/current-disciplines.service';
import { TeachersService } from 'src/teachers/teachers.service';
import { UpdateDisciplineTeacherInputDto } from './dto/update-discipline-teacher.dto';

@ApiBearerAuth()
@UseGuards(UserRoleGuard)
@RequiredUserRoles(UserRole.Admin)
@ApiTags('disciplineTeachers')
@Controller('disciplineTeachers')
export class DisciplineTeachersController {
  constructor(
    private readonly disciplineTeachersService: DisciplineTeachersService,
    private readonly currentDisciplinesService: CurrentDisciplinesService,
    private readonly teachersService: TeachersService,
  ) {}

  @Post()
  @RequiredUserRoles(UserRole.Admin)
  @ApiOperation({ summary: 'Create discipline teacher' })
  @ApiResponse({
    status: 201,
    description: 'Discipline teacher created',
    type: DisciplineTeacher,
  })
  async create(
    @Body() createDisciplineTeacherInputDto: CreateDisciplineTeacherInputDto,
  ): Promise<DisciplineTeacher> {
    const currentDiscipline = await this.currentDisciplinesService.findById(
      createDisciplineTeacherInputDto.currentDisciplineId,
    );

    if (!currentDiscipline) {
      throw new BadRequestException(
        `Current discipline with id (${createDisciplineTeacherInputDto.currentDisciplineId}) does not exists`,
      );
    }

    const teacher = await this.teachersService.findById(
      createDisciplineTeacherInputDto.teacherId,
    );

    if (!teacher) {
      throw new BadRequestException(
        `Teacher with id (${createDisciplineTeacherInputDto.teacherId}) does not exists`,
      );
    }

    const candidate = await this.disciplineTeachersService.findOne({
      currentDiscipline: {
        id: Number(createDisciplineTeacherInputDto.currentDisciplineId),
      },
      teacher: { id: Number(createDisciplineTeacherInputDto.teacherId) },
      formOfConductingClasses:
        createDisciplineTeacherInputDto.formOfConductingClasses,
    });

    if (candidate) {
      throw new BadRequestException(
        `Discipline teacher with this configuration already exists (disciplineTeacherId: ${candidate.id})`,
      );
    }

    return this.disciplineTeachersService.create(
      createDisciplineTeacherInputDto,
      currentDiscipline,
      teacher,
    );
  }

  @Get()
  @RequiredUserRoles(UserRole.Admin, UserRole.Teacher)
  @ApiOperation({ summary: 'Find all discipline teachers' })
  @ApiResponse({
    status: 200,
    description: 'All discipline teachers',
    type: Array<DisciplineTeacher>,
  })
  async findAll() {
    return this.disciplineTeachersService.findAll({
      currentDiscipline: true,
      teacher: true,
    });
  }

  @Get(':id')
  @RequiredUserRoles(UserRole.Admin, UserRole.Teacher)
  @ApiOperation({ summary: 'Find discipline teacher' })
  @ApiResponse({
    status: 200,
    description: 'Find discipline teacher by id',
    type: DisciplineTeacher,
  })
  async findOne(@Param('id') id: string) {
    return this.disciplineTeachersService.findById(Number(id), {
      currentDiscipline: true,
      teacher: true,
    });
  }

  @Patch(':id')
  @RequiredUserRoles(UserRole.Admin)
  async update(
    @Param('id') id: string,
    @Body() updateDisciplineTeacherInputDto: UpdateDisciplineTeacherInputDto,
  ) {
    return this.disciplineTeachersService.update(
      Number(id),
      updateDisciplineTeacherInputDto,
    );
  }

  @Delete(':id')
  @RequiredUserRoles(UserRole.Admin)
  async remove(@Param('id') id: string) {
    return this.disciplineTeachersService.remove(Number(id));
  }
}
