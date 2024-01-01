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

import { UsersService } from 'src/users/users.service';
import { UserRole } from 'src/common/contracts';
import { UserRoleGuard } from 'src/common/guards/user-role.guard';
import { RequiredUserRoles } from 'src/common/decorators/user-role.decorator';
import { AuthService } from 'src/auth/auth.service';
import { TeachersService } from './teachers.service';
import { Teacher } from './entities/teacher.entity';
import { CreateTeacherInputDto } from './dto/create-teacher.dto';
import { UpdateTeacherInputDto } from './dto/update-teacher.dto';

@ApiBearerAuth()
@UseGuards(UserRoleGuard)
@RequiredUserRoles(UserRole.Admin)
@ApiTags('teachers')
@Controller('teachers')
export class TeachersController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly teachersService: TeachersService,
  ) {}

  @Post()
  @RequiredUserRoles(UserRole.Admin)
  @ApiOperation({ summary: 'Create teacher' })
  @ApiResponse({
    status: 201,
    description: 'Teacher created',
    type: Teacher,
  })
  async create(
    @Body() createTeacherInputDto: CreateTeacherInputDto,
  ): Promise<Teacher> {
    const alreadyExistingUser = await this.usersService.findByLogin(
      createTeacherInputDto.login,
    );

    if (alreadyExistingUser) {
      throw new BadRequestException('User with this login already exists');
    }

    await this.authService.signUp({
      ...createTeacherInputDto,
      role: UserRole.Admin,
    });

    const user = await this.usersService.findByLogin(
      createTeacherInputDto.login,
    );

    if (!user) throw new BadRequestException('User not created');

    return this.teachersService.create(createTeacherInputDto, user);
  }

  @Get()
  @RequiredUserRoles(UserRole.Admin, UserRole.Teacher)
  @ApiOperation({ summary: 'Find all teachers' })
  @ApiResponse({
    status: 200,
    description: 'All teachers',
    type: Array<Teacher>,
  })
  findAll() {
    return this.teachersService.findAll();
  }

  @Get(':id')
  @RequiredUserRoles(UserRole.Admin, UserRole.Teacher)
  @ApiOperation({ summary: 'Find teacher' })
  @ApiResponse({
    status: 200,
    description: 'Find teacher by id',
    type: Teacher,
  })
  findOne(@Param('id') id: string) {
    return this.teachersService.findById(Number(id), { user: true });
  }

  @Patch(':id')
  @RequiredUserRoles(UserRole.Admin)
  async update(
    @Param('id') id: string,
    @Body() updateTeacherInputDto: UpdateTeacherInputDto,
  ) {
    const teacher = await this.teachersService.findById(Number(id), {
      user: true,
    });

    if (!teacher?.user)
      throw new BadRequestException('User with this login do not exists');

    await this.usersService.update(Number(teacher.user.id), {
      ...updateTeacherInputDto,
      password: updateTeacherInputDto.password
        ? await bcrypt.hash(updateTeacherInputDto?.password, 10)
        : updateTeacherInputDto.password,
    });

    return this.teachersService.update(Number(id), updateTeacherInputDto);
  }

  @Delete(':id')
  @RequiredUserRoles(UserRole.Admin)
  async remove(@Param('id') id: string) {
    const teacher = await this.teachersService.findById(Number(id), {
      user: true,
    });

    if (!teacher?.user)
      throw new BadRequestException('User with this login do not exists');

    await this.usersService.remove(Number(teacher.user.id));

    return this.teachersService.remove(Number(id));
  }
}
