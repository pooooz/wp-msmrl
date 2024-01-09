import { PartialType } from '@nestjs/mapped-types';
import { CreateCurrentDisciplineInputDto } from './create-current-discipline.dto';

export class UpdateCurrentDisciplineInputDto extends PartialType(
  CreateCurrentDisciplineInputDto,
) {}
