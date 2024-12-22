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
  InternalServerErrorException,
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
import { DeepPartial, In } from 'typeorm';
import { NotFoundError } from 'rxjs';

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
  async create(@Body() createStudentInputDto: CreateStudentInputDto) {
    const group = await this.groupsService.findById(
      createStudentInputDto.groupId,
    );

    if (!group) {
      throw new BadRequestException(
        `Group with id (${createStudentInputDto.groupId}) does not exist`,
      );
    }

    await this.studentsService.create(createStudentInputDto, group);

    return { message: 'Created' };
  }

  @Get()
  @RequiredUserRoles(UserRole.Admin, UserRole.Teacher)
  @ApiOperation({ summary: 'Find all students' })
  @ApiResponse({
    status: 200,
    description: 'All students',
    type: Array<Student>,
  })
  async findAll() {
    const students = await this.studentsService.findAll();

    const groupIds = new Set(students.map((student) => student.groupId));
    const groups = await this.groupsService.find({ id: In([...groupIds]) });

    const resolvedStudents = [];
    for await (const student of students) {
      const correspondingGroup = groups.find(
        (group) => group.id === student.groupId,
      );

      if (!correspondingGroup) {
        throw new BadRequestException(
          `Student with id (${student.id}) does not have group. Group id (${student.groupId})`,
        );
      }

      resolvedStudents.push({ ...student, group: correspondingGroup });
    }

    return resolvedStudents;
  }

  @Get(':id')
  @RequiredUserRoles(UserRole.Admin, UserRole.Teacher)
  @ApiOperation({ summary: 'Find student' })
  @ApiResponse({
    status: 200,
    description: 'Find student by id',
    type: Student,
  })
  async findOne(@Param('id') id: string) {
    const student = await this.studentsService.findById(Number(id));
    if (!student) {
      throw new NotFoundException();
    }

    const correspondingGroup = await this.groupsService.findById(
      student?.groupId,
    );

    if (!correspondingGroup) {
      throw new InternalServerErrorException('Student without group');
    }

    return {
      ...student,
      group: correspondingGroup,
    };
  }

  @Get('/tasks/:taskId')
  @RequiredUserRoles(UserRole.Admin, UserRole.Teacher)
  @ApiOperation({ summary: 'Find students by task id' })
  @ApiResponse({
    status: 200,
    description: 'Find students by task id',
    type: Student,
  })
  async findByTaskId(@Param('taskId') taskId: string) {
    const groups = await this.groupsService.find(
      {
        currentDisciplines: {
          tasks: { id: Number(taskId) },
        },
      },
      { students: true },
    );

    const groupId = groups[0].id;

    const students = await this.studentsService.findAll();

    const filteredStudents = students.filter(
      (student) => student.groupId === groupId,
    );

    return filteredStudents;

    // return this.studentsService.find(
    //   {
    //     group: {
    //       currentDisciplines: {
    //         tasks: { id: Number(taskId) },
    //       },
    //     },
    //   },
    //   { group: true },
    // );
  }

  // @Patch(':id')
  // @RequiredUserRoles(UserRole.Admin)
  // async update(
  //   @Param('id') id: string,
  //   @Body() updateStudentInputDto: UpdateStudentInputDto,
  // ) {
  //   const { groupId, ...updateStudentInputDtoRest } = updateStudentInputDto;
  //   const udpateDto: DeepPartial<Student> = { ...updateStudentInputDtoRest };

  //   if (groupId) {
  //     const group = await this.groupsService.findById(groupId);

  //     if (!group) {
  //       throw new BadRequestException(
  //         `Group with id (${groupId}) does not exist`,
  //       );
  //     }

  //     udpateDto.group = group;
  //   }

  //   return this.studentsService.update(Number(id), udpateDto);
  // }

  @Delete(':id')
  @RequiredUserRoles(UserRole.Admin)
  async remove(@Param('id') id: string) {
    await this.studentsService.remove(Number(id));

    return { message: 'Deleted' };
  }
}
