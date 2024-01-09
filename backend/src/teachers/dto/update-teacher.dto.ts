import { PartialType } from '@nestjs/mapped-types';
import { CreateTeacherInputDto } from './create-teacher.dto';

export class UpdateTeacherInputDto extends PartialType(CreateTeacherInputDto) {}
