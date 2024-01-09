import { PartialType } from '@nestjs/mapped-types';
import { CreateDisciplineTeacherInputDto } from './create-discipline-teacher.dto';

export class UpdateDisciplineTeacherInputDto extends PartialType(
  CreateDisciplineTeacherInputDto,
) {}
