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
import { StudentsService } from './students.service';
import { GroupsService } from 'src/groups/group.service';
import { CreateStudentInputDto } from './dto/create-student.dto';
import { Student } from './entities/student.entity';
import { UpdateStudentInputDto } from './dto/update-student.dto';
import { DeepPartial } from 'typeorm';

@ApiBearerAuth()
@UseGuards(UserRoleGuard)
@ApiTags('students')
@Controller('students')
export class StudentsController {
  constructor(
    private readonly studentsService: StudentsService,
    private readonly groupsService: GroupsService,
  ) {}

  @Post()
  @RequiredUserRoles(UserRole.Admin)
  @ApiOperation({ summary: 'Create student' })
  @ApiResponse({
    status: 201,
    description: 'Student created',
    type: Student,
  })
  async create(
    @Body() createStudentInputDto: CreateStudentInputDto,
  ): Promise<Student> {
    const group = await this.groupsService.findById(
      createStudentInputDto.groupId,
    );

    if (!group) {
      throw new BadRequestException(
        `Group with id (${createStudentInputDto.groupId}) does not exist`,
      );
    }

    return this.studentsService.create(createStudentInputDto, group);
  }

  @Get()
  @RequiredUserRoles(UserRole.Admin, UserRole.Teacher)
  @ApiOperation({ summary: 'Find all students' })
  @ApiResponse({
    status: 200,
    description: 'All students',
    type: Array<Student>,
  })
  findAll() {
    return this.studentsService.findAll({
      group: true,
    });
  }

  @Get(':id')
  @RequiredUserRoles(UserRole.Admin, UserRole.Teacher)
  @ApiOperation({ summary: 'Find student' })
  @ApiResponse({
    status: 200,
    description: 'Find student by id',
    type: Student,
  })
  findOne(@Param('id') id: string) {
    return this.studentsService.findById(Number(id), { group: true });
  }

  @Get('/tasks/:taskId')
  @RequiredUserRoles(UserRole.Admin, UserRole.Teacher)
  @ApiOperation({ summary: 'Find students by task id' })
  @ApiResponse({
    status: 200,
    description: 'Find students by task id',
    type: Student,
  })
  findByTaskId(@Param('taskId') taskId: string) {
    return this.studentsService.find(
      {
        group: {
          currentDisciplines: {
            tasks: { id: Number(taskId) },
          },
        },
      },
      { group: true },
    );
  }

  @Patch(':id')
  @RequiredUserRoles(UserRole.Admin)
  async update(
    @Param('id') id: string,
    @Body() updateStudentInputDto: UpdateStudentInputDto,
  ) {
    const { groupId, ...updateStudentInputDtoRest } = updateStudentInputDto;
    const udpateDto: DeepPartial<Student> = { ...updateStudentInputDtoRest };

    if (groupId) {
      const group = await this.groupsService.findById(groupId);

      if (!group) {
        throw new BadRequestException(
          `Group with id (${groupId}) does not exist`,
        );
      }

      udpateDto.group = group;
    }

    return this.studentsService.update(Number(id), udpateDto);
  }

  @Delete(':id')
  @RequiredUserRoles(UserRole.Admin)
  async remove(@Param('id') id: string) {
    return this.studentsService.remove(Number(id));
  }
}
