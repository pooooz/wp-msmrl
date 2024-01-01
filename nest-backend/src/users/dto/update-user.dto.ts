import { PartialType } from '@nestjs/mapped-types';
import { CreateUserInputDto } from './create-user.dto';

export class UpdateUserInputDto extends PartialType(CreateUserInputDto) {}
