import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { DisciplinesService } from './disciplines.service';
import { CreateDisciplineInputDto } from './dto/create-discipline.dto';
import { Discipline } from './entities/discipline.entity';
import { UpdateDisciplineInputDto } from './dto/update-discipline.dto';
import { RequiredUserRoles } from 'src/common/decorators/user-role.decorator';
import { UserRole } from 'src/common/contracts';
import { UserRoleGuard } from 'src/common/guards/user-role.guard';

@UseGuards(UserRoleGuard)
@ApiBearerAuth()
@ApiTags('disciplines')
@Controller('disciplines')
export class DisciplinesController {
  constructor(private readonly disciplinesService: DisciplinesService) {}

  @Post()
  @RequiredUserRoles(UserRole.Admin)
  @ApiOperation({ summary: 'Create discipline' })
  @ApiResponse({
    status: 201,
    description: 'Discipline created',
    type: Discipline,
  })
  create(
    @Body() createDisciplineInputDto: CreateDisciplineInputDto,
  ): Promise<Discipline> {
    return this.disciplinesService.create(createDisciplineInputDto);
  }

  @Get()
  @RequiredUserRoles(UserRole.Admin, UserRole.Teacher)
  @ApiOperation({ summary: 'Find all disciplines' })
  @ApiResponse({
    status: 200,
    description: 'All users',
    type: Array<Discipline>,
  })
  async findAll() {
    return this.disciplinesService.findAll();
  }

  @Get(':id')
  @RequiredUserRoles(UserRole.Admin, UserRole.Teacher)
  @ApiOperation({ summary: 'Find discipline' })
  @ApiResponse({
    status: 200,
    description: 'Find discipline by id',
    type: Discipline,
  })
  findOne(@Param('id') id: string) {
    return this.disciplinesService.findById(Number(id));
  }

  @Patch(':id')
  @RequiredUserRoles(UserRole.Admin)
  @ApiOperation({ summary: 'Update discipline' })
  update(
    @Param('id') id: string,
    @Body() updateDisciplineInputDto: UpdateDisciplineInputDto,
  ) {
    return this.disciplinesService.update(Number(id), updateDisciplineInputDto);
  }

  @Delete(':id')
  @RequiredUserRoles(UserRole.Admin)
  @ApiOperation({ summary: 'Delete discipline' })
  remove(@Param('id') id: string) {
    return this.disciplinesService.remove(Number(id));
  }
}
