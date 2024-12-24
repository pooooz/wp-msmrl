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
import { CurrentDisciplinesService } from './current-disciplines.service';
import { CurrentDiscipline } from './entities/current-discipline.entity';
import { CreateCurrentDisciplineInputDto } from './dto/create-current-discipline.dto';
import { UpdateCurrentDisciplineInputDto } from './dto/update-current-discipline.dto';
import { DisciplinesService } from 'src/disciplines/disciplines.service';
import { GroupsService } from 'src/groups/group.service';
import { DataSource, DeepPartial } from 'typeorm';

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
    private readonly dataSource: DataSource,
  ) {}

  @Post()
  @RequiredUserRoles(UserRole.Admin)
  @ApiOperation({ summary: 'Create current discipline' })
  @ApiResponse({
    status: 201,
    description: 'Current discipline created',
    type: CurrentDiscipline,
  })
  async create(
    @Body() createCurrentDisciplineInputDto: CreateCurrentDisciplineInputDto,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();

    try {
      await queryRunner.startTransaction();

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

      const result = this.currentDisciplinesService.create(
        createCurrentDisciplineInputDto,
        discipline,
        group,
      );

      await queryRunner.commitTransaction();

      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
    } finally {
      await queryRunner.release();
    }
  }

  @Get()
  @RequiredUserRoles(UserRole.Admin, UserRole.Teacher)
  @ApiOperation({ summary: 'Find all current disciplines' })
  @ApiResponse({
    status: 200,
    description: 'All current disciplines',
    type: Array<CurrentDiscipline>,
  })
  async findAll() {
    const currentDisciplines = await this.currentDisciplinesService.findAll({
      group: true,
    });

    const disciplines = await this.disciplinesService.findAll();

    const resolvedCurrentDisciplines = [];
    for await (const currentDiscipline of currentDisciplines) {
      const correspondingDescipline = disciplines.find(
        (discipline) => discipline.id === currentDiscipline.disciplineId,
      );

      if (!correspondingDescipline) {
        throw new BadRequestException(
          `Current discipline with id (${currentDiscipline.id}) does not have discipline stored. Discipline id (${currentDiscipline.disciplineId})`,
        );
      }

      resolvedCurrentDisciplines.push({
        ...currentDiscipline,
        discipline: correspondingDescipline,
      });
    }

    return resolvedCurrentDisciplines;
  }

  @Get('/disciplines/:disciplineId')
  @RequiredUserRoles(UserRole.Admin, UserRole.Teacher)
  @ApiOperation({ summary: 'Find all current disciplines by discipline id' })
  @ApiResponse({
    status: 200,
    description: 'All current disciplines for discipline with specified id',
    type: Array<CurrentDiscipline>,
  })
  async findByDisciplineId(
    @Param('disciplineId') id: string,
    @Query('year') year?: string,
  ) {
    if (year) {
      const resolvedCurrentDisciplines = [];
      const currentDisciplines = await this.currentDisciplinesService.find(
        {
          disciplineId: Number(id),
          year: Number(year),
        },
        {
          group: true,
          disciplineTeachers: {
            teacher: true,
          },
        },
      );

      for await (const currentDiscipline of currentDisciplines) {
        const correspondingDescipline = await this.disciplinesService.findById(
          currentDiscipline.disciplineId,
        );

        if (!correspondingDescipline) {
          throw new BadRequestException(
            `Current discipline with id (${currentDiscipline.id}) does not have discipline stored. Discipline id (${currentDiscipline.disciplineId})`,
          );
        }

        resolvedCurrentDisciplines.push({
          ...currentDiscipline,
          discipline: correspondingDescipline,
        });
      }

      return resolvedCurrentDisciplines;
    }

    const currentDisciplines = await this.currentDisciplinesService.find(
      {
        disciplineId: Number(id),
      },
      {
        group: true,
        disciplineTeachers: {
          teacher: true,
        },
      },
    );

    const resolvedCurrentDisciplines = [];
    for await (const currentDiscipline of currentDisciplines) {
      const correspondingDescipline = await this.disciplinesService.findById(
        currentDiscipline.disciplineId,
      );

      if (!correspondingDescipline) {
        throw new BadRequestException(
          `Current discipline with id (${currentDiscipline.id}) does not have discipline stored. Discipline id (${currentDiscipline.disciplineId})`,
        );
      }

      resolvedCurrentDisciplines.push({
        ...currentDiscipline,
        discipline: correspondingDescipline,
      });
    }

    return resolvedCurrentDisciplines;
  }

  @Get(':id')
  @RequiredUserRoles(UserRole.Admin, UserRole.Teacher)
  @ApiOperation({ summary: 'Find current discipline' })
  @ApiResponse({
    status: 200,
    description: 'Find current discipline by id',
    type: CurrentDiscipline,
  })
  async findOne(@Param('id') id: string) {
    const currentDiscipline = await this.currentDisciplinesService.findById(
      Number(id),
      {
        group: true,
        tasks: true,
      },
    );

    if (!currentDiscipline) {
      throw new NotFoundException();
    }

    const correspondingDescipline = await this.disciplinesService.findById(
      currentDiscipline.disciplineId,
    );

    return { ...currentDiscipline, discipline: correspondingDescipline };
  }

  @Patch(':id')
  @RequiredUserRoles(UserRole.Admin)
  async update(
    @Param('id') id: string,
    @Body() updateCurrentDisciplineInputDto: UpdateCurrentDisciplineInputDto,
  ) {
    const { disciplineId, groupId, ...updateCurrentDisciplineInputDtoRest } =
      updateCurrentDisciplineInputDto;

    const updateDto: DeepPartial<CurrentDiscipline> = {
      ...updateCurrentDisciplineInputDtoRest,
    };

    if (disciplineId) {
      const discipline = await this.disciplinesService.findById(disciplineId);

      if (!discipline) {
        throw new BadRequestException(
          `Discipline with id (${updateCurrentDisciplineInputDto.disciplineId}) does not exist`,
        );
      }

      updateDto.disciplineId = discipline.id;
    }

    if (groupId) {
      const group = await this.groupsService.findById(groupId);

      if (!group) {
        throw new BadRequestException(
          `Group with id (${updateCurrentDisciplineInputDto.groupId}) does not exist`,
        );
      }

      updateDto.group = group;
    }

    return this.currentDisciplinesService.update(Number(id), updateDto);
  }

  @Delete(':id')
  @RequiredUserRoles(UserRole.Admin)
  async remove(@Param('id') id: string) {
    return this.currentDisciplinesService.remove(Number(id));
  }
}
