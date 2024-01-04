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
import { DisciplineTeachersService } from './discipline-teachers.service';
import { DisciplineTeacher } from './entities/discipline-teachers.entity';
import { CreateDisciplineTeacherInputDto } from './dto/create-discipline-teacher.dto';
import { CurrentDisciplinesService } from 'src/current-disciplines/current-disciplines.service';
import { TeachersService } from 'src/teachers/teachers.service';
import { UpdateDisciplineTeacherInputDto } from './dto/update-discipline-teacher.dto';
import { DeepPartial } from 'typeorm';

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

  @Get('/teachers/:teacherId')
  @RequiredUserRoles(UserRole.Admin, UserRole.Teacher)
  @ApiOperation({ summary: 'Find discipline teachers' })
  @ApiResponse({
    status: 200,
    description: 'Find discipline teachers by teacher id',
    type: DisciplineTeacher,
  })
  async findByTeacherId(@Param('teacherId') teacherId: string) {
    return this.disciplineTeachersService.find(
      {
        teacher: { id: Number(teacherId) },
      },
      {
        currentDiscipline: {
          discipline: true,
          group: true,
        },
        teacher: true,
      },
    );
  }

  @Get('/currentDisciplines/:currentDisciplineId')
  @RequiredUserRoles(UserRole.Admin, UserRole.Teacher)
  @ApiOperation({ summary: 'Find discipline teachers' })
  @ApiResponse({
    status: 200,
    description: 'Find discipline teacher by current discipline id',
    type: DisciplineTeacher,
  })
  async findByCurrentDisciplineId(
    @Param('currentDisciplineId') currentDisciplineId: string,
  ) {
    return this.disciplineTeachersService.find(
      {
        currentDiscipline: { id: Number(currentDisciplineId) },
      },
      {
        teacher: true,
      },
    );
  }

  @Patch(':id')
  @RequiredUserRoles(UserRole.Admin)
  async update(
    @Param('id') id: string,
    @Body() updateDisciplineTeacherInputDto: UpdateDisciplineTeacherInputDto,
  ) {
    const {
      currentDisciplineId,
      teacherId,
      ...updateDisciplineTeacherInputDtoRest
    } = updateDisciplineTeacherInputDto;

    const updateDto: DeepPartial<DisciplineTeacher> = {
      ...updateDisciplineTeacherInputDtoRest,
    };

    if (currentDisciplineId) {
      const currentDiscipline = await this.currentDisciplinesService.findById(
        currentDisciplineId,
      );

      if (!currentDiscipline) {
        throw new BadRequestException(
          `Current discipline with id (${currentDisciplineId}) does not exist`,
        );
      }

      updateDto.currentDiscipline = currentDiscipline;
    }

    if (teacherId) {
      const teacher = await this.teachersService.findById(teacherId);

      if (!teacher) {
        throw new BadRequestException(
          `Teacher with id (${teacherId}) does not exist`,
        );
      }

      updateDto.teacher = teacher;
    }

    return this.disciplineTeachersService.update(Number(id), updateDto);
  }

  @Delete(':id')
  @RequiredUserRoles(UserRole.Admin)
  async remove(@Param('id') id: string) {
    return this.disciplineTeachersService.remove(Number(id));
  }
}
