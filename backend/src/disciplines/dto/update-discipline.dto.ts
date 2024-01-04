import { PartialType } from '@nestjs/mapped-types';
import { CreateDisciplineInputDto } from './create-discipline.dto';

export class UpdateDisciplineInputDto extends PartialType(
  CreateDisciplineInputDto,
) {}
