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

import { UserRole } from 'src/common/contracts';
import { UserRoleGuard } from 'src/common/guards/user-role.guard';
import { RequiredUserRoles } from 'src/common/decorators/user-role.decorator';
import { SpecializationsService } from './specializations.service';
import { Specialization } from './entities/specialization.entity';
import { CreateSpecializationInputDto } from './dto/create-specialization.dto';
import { UpdateSpecializationInputDto } from './dto/update-specialization.dto';

@ApiBearerAuth()
@UseGuards(UserRoleGuard)
@ApiTags('specializations')
@Controller('specializations')
export class SpecializationsController {
  constructor(
    private readonly specializationsService: SpecializationsService,
  ) {}

  @Post()
  @RequiredUserRoles(UserRole.Admin)
  @ApiOperation({ summary: 'Create specialization' })
  @ApiResponse({
    status: 201,
    description: 'Specialization created',
    type: Specialization,
  })
  async create(
    @Body() createSpecializationInputDto: CreateSpecializationInputDto,
  ): Promise<Specialization> {
    return this.specializationsService.create(createSpecializationInputDto);
  }

  @Get()
  @RequiredUserRoles(UserRole.Admin, UserRole.Teacher)
  @ApiOperation({ summary: 'Find all specializations' })
  @ApiResponse({
    status: 200,
    description: 'All specializations',
    type: Array<Specialization>,
  })
  findAll() {
    return this.specializationsService.findAll({ groups: true });
  }

  @Get(':id')
  @RequiredUserRoles(UserRole.Admin, UserRole.Teacher)
  @ApiOperation({ summary: 'Find teacher' })
  @ApiResponse({
    status: 200,
    description: 'Find teacher by id',
    type: Specialization,
  })
  findOne(@Param('id') id: string) {
    return this.specializationsService.findById(Number(id), { groups: true });
  }

  @Patch(':id')
  @RequiredUserRoles(UserRole.Admin)
  async update(
    @Param('id') id: string,
    @Body() updateSpecializationInputDto: UpdateSpecializationInputDto,
  ) {
    return this.specializationsService.update(
      Number(id),
      updateSpecializationInputDto,
    );
  }

  @Delete(':id')
  @RequiredUserRoles(UserRole.Admin)
  async remove(@Param('id') id: string) {
    return this.specializationsService.remove(Number(id));
  }
}
