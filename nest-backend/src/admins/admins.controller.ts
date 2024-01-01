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
import { AdminsService } from './admins.service';
import { Admin } from './entities/admin.entity';
import { CreateAdminInputDto } from './dto/create-admin.dto';
import { UpdateAdminInputDto } from './dto/update-admin.dto';
import { UsersService } from 'src/users/users.service';
import { UserRole } from 'src/common/contracts';
import { UserRoleGuard } from 'src/common/guards/user-role.guard';
import { RequiredUserRoles } from 'src/common/decorators/user-role.decorator';
import { AuthService } from 'src/auth/auth.service';

@ApiBearerAuth()
@UseGuards(UserRoleGuard)
@RequiredUserRoles(UserRole.Admin)
@ApiTags('admins')
@Controller('admins')
export class AdminsController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly adminsService: AdminsService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create admin' })
  @ApiResponse({
    status: 201,
    description: 'Admin created',
    type: Admin,
  })
  async create(
    @Body() createAdminInputDto: CreateAdminInputDto,
  ): Promise<Admin> {
    const alreadyExistingUser = await this.usersService.findByLogin(
      createAdminInputDto.login,
    );

    if (alreadyExistingUser) {
      throw new BadRequestException('Admin with this login already exists');
    }

    await this.authService.signUp({
      ...createAdminInputDto,
      role: UserRole.Admin,
    });

    const user = await this.usersService.findByLogin(createAdminInputDto.login);

    if (!user) throw new BadRequestException('User not created');

    return this.adminsService.create(createAdminInputDto, user);
  }

  @Get()
  @ApiOperation({ summary: 'Find all admins' })
  @ApiResponse({
    status: 200,
    description: 'All admins',
    type: Array<Admin>,
  })
  findAll() {
    return this.adminsService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find admin' })
  @ApiResponse({
    status: 200,
    description: 'Find admin by id',
    type: Admin,
  })
  findOne(@Param('id') id: string) {
    return this.adminsService.findById(Number(id), { user: true });
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateAdminInputDto: UpdateAdminInputDto,
  ) {
    const admin = await this.adminsService.findById(Number(id), { user: true });

    if (!admin?.user)
      throw new BadRequestException('User with this login do not exists');

    await this.usersService.update(Number(admin.user.id), updateAdminInputDto);

    return this.adminsService.update(Number(id), updateAdminInputDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const admin = await this.adminsService.findById(Number(id), { user: true });

    if (!admin?.user)
      throw new BadRequestException('User with this login do not exists');

    await this.usersService.remove(Number(admin.user.id));

    return this.adminsService.remove(Number(id));
  }
}
