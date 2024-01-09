import { PartialType } from '@nestjs/mapped-types';
import { CreateAdminInputDto } from './create-admin.dto';

export class UpdateAdminInputDto extends PartialType(CreateAdminInputDto) {}
