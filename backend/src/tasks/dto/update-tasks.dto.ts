import { PartialType } from '@nestjs/mapped-types';
import { CreateTaskInputDto } from './create-tasks.dto';

export class UpdateTaskInputDto extends PartialType(CreateTaskInputDto) {}
