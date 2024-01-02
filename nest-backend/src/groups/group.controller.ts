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

import { UsersService } from 'src/users/users.service';
import { UserRole } from 'src/common/contracts';
import { UserRoleGuard } from 'src/common/guards/user-role.guard';
import { RequiredUserRoles } from 'src/common/decorators/user-role.decorator';
import { GroupsService } from './group.service';
import { Group } from './entities/group.entity';
import { CreateGroupInputDto } from './dto/create-group.dto';
import { UpdateGroupInputDto } from './dto/update-group.dto';
import { SpecializationsService } from 'src/specializations/specializations.service';

@ApiBearerAuth()
@UseGuards(UserRoleGuard)
@ApiTags('groups')
@Controller('groups')
export class GroupsController {
  constructor(
    private readonly groupsService: GroupsService,
    private readonly specializationsService: SpecializationsService,
  ) {}

  @Post()
  @RequiredUserRoles(UserRole.Admin)
  @ApiOperation({ summary: 'Create group' })
  @ApiResponse({
    status: 201,
    description: 'Group created',
    type: Group,
  })
  async create(
    @Body() createGroupInputDto: CreateGroupInputDto,
  ): Promise<Group> {
    const specialization = await this.specializationsService.findById(
      createGroupInputDto.specializationId,
    );

    if (!specialization) {
      throw new BadRequestException(
        `Specialization with id (${createGroupInputDto.specializationId}) does not exist`,
      );
    }

    return this.groupsService.create(createGroupInputDto, specialization);
  }

  @Get()
  @RequiredUserRoles(UserRole.Admin, UserRole.Teacher)
  @ApiOperation({ summary: 'Find all groups' })
  @ApiResponse({
    status: 200,
    description: 'All groups',
    type: Array<Group>,
  })
  findAll() {
    return this.groupsService.findAll({ specialization: true });
  }

  @Get(':id')
  @RequiredUserRoles(UserRole.Admin, UserRole.Teacher)
  @ApiOperation({ summary: 'Find group' })
  @ApiResponse({
    status: 200,
    description: 'Find group by id',
    type: Group,
  })
  findOne(@Param('id') id: string) {
    return this.groupsService.findById(Number(id), {
      specialization: true,
      students: true,
    });
  }

  @Patch(':id')
  @RequiredUserRoles(UserRole.Admin)
  async update(
    @Param('id') id: string,
    @Body() updateGroupInputDto: UpdateGroupInputDto,
  ) {
    if (updateGroupInputDto.specializationId) {
      const specialization = await this.specializationsService.findById(
        updateGroupInputDto.specializationId,
      );

      if (!specialization) {
        throw new BadRequestException(
          `Specialization with id (${updateGroupInputDto.specializationId}) does not exist`,
        );
      }

      const { specializationId, ...updateGroupInputDtoRest } =
        updateGroupInputDto;
      return this.groupsService.update(Number(id), {
        ...updateGroupInputDtoRest,
        specialization,
      });
    }

    return this.groupsService.update(Number(id), updateGroupInputDto);
  }

  @Delete(':id')
  @RequiredUserRoles(UserRole.Admin)
  async remove(@Param('id') id: string) {
    return this.groupsService.remove(Number(id));
  }
}
