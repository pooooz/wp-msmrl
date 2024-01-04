import { PartialType } from '@nestjs/mapped-types';
import { CreateGroupInputDto } from './create-group.dto';

export class UpdateGroupInputDto extends PartialType(CreateGroupInputDto) {}
