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
  Query,
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
import { CurrentDisciplinesService } from './current-disciplines.service';
import { CurrentDiscipline } from './entities/current-discipline.entity';
import { CreateCurrentDisciplineInputDto } from './dto/create-current-discipline.dto';
import { UpdateCurrentDisciplineInputDto } from './dto/update-current-discipline.dto';
import { DisciplinesService } from 'src/disciplines/disciplines.service';
import { GroupsService } from 'src/groups/group.service';

@ApiBearerAuth()
@UseGuards(UserRoleGuard)
@RequiredUserRoles(UserRole.Admin)
@ApiTags('currentDisciplines')
@Controller('currentDisciplines')
export class CurrentDisciplinesController {
  constructor(
    private readonly currentDisciplinesService: CurrentDisciplinesService,
    private readonly disciplinesService: DisciplinesService,
    private readonly groupsService: GroupsService,
  ) {}

  @Post()
  @RequiredUserRoles(UserRole.Admin)
  @ApiOperation({ summary: 'Create current discipline' })
  @ApiResponse({
    status: 201,
    description: 'Create current created',
    type: CurrentDiscipline,
  })
  async create(
    @Body() createCurrentDisciplineInputDto: CreateCurrentDisciplineInputDto,
  ): Promise<CurrentDiscipline> {
    const discipline = await this.disciplinesService.findById(
      createCurrentDisciplineInputDto.disciplineId,
    );

    if (!discipline) {
      throw new BadRequestException(
        `Discipline with this id (${createCurrentDisciplineInputDto.disciplineId}) does not exist`,
      );
    }

    const group = await this.groupsService.findById(
      createCurrentDisciplineInputDto.groupId,
    );

    if (!group) {
      throw new BadRequestException(
        `Group with this id (${createCurrentDisciplineInputDto.groupId}) does not exist`,
      );
    }

    return this.currentDisciplinesService.create(
      createCurrentDisciplineInputDto,
      discipline,
      group,
    );
  }

  @Get()
  @RequiredUserRoles(UserRole.Admin, UserRole.Teacher)
  @ApiOperation({ summary: 'Find all current disciplines' })
  @ApiResponse({
    status: 200,
    description: 'All current disciplines',
    type: Array<CurrentDiscipline>,
  })
  findAll() {
    return this.currentDisciplinesService.findAll({
      discipline: true,
      group: true,
    });
  }

  @Get('/disciplines/:disciplineId')
  @RequiredUserRoles(UserRole.Admin, UserRole.Teacher)
  @ApiOperation({ summary: 'Find all current disciplines by discipline id' })
  @ApiResponse({
    status: 200,
    description: 'All current disciplines for discipline with specified id',
    type: Array<CurrentDiscipline>,
  })
  findByDisciplineId(
    @Param('disciplineId') id: string,
    @Query('year') year?: string,
  ) {
    if (year) {
      return this.currentDisciplinesService.find(
        {
          discipline: { id: Number(id) },
          year: Number(year),
        },
        {
          group: true,
          disciplineTeachers: {
            teacher: true,
          },
        },
      );
    }

    return this.currentDisciplinesService.find(
      {
        discipline: { id: Number(id) },
      },
      {
        group: true,
        disciplineTeachers: {
          teacher: true,
        },
      },
    );
  }

  @Get(':id')
  @RequiredUserRoles(UserRole.Admin, UserRole.Teacher)
  @ApiOperation({ summary: 'Find current discipline' })
  @ApiResponse({
    status: 200,
    description: 'Find current discipline by id',
    type: CurrentDiscipline,
  })
  findOne(@Param('id') id: string) {
    return this.currentDisciplinesService.findById(Number(id), {
      discipline: true,
      group: true,
    });
  }

  @Patch(':id')
  @RequiredUserRoles(UserRole.Admin)
  async update(
    @Param('id') id: string,
    @Body() updateCurrentDisciplineInputDto: UpdateCurrentDisciplineInputDto,
  ) {
    return this.currentDisciplinesService.update(
      Number(id),
      updateCurrentDisciplineInputDto,
    );
  }

  @Delete(':id')
  @RequiredUserRoles(UserRole.Admin)
  async remove(@Param('id') id: string) {
    return this.currentDisciplinesService.remove(Number(id));
  }
}
