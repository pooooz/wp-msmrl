import { PartialType } from '@nestjs/mapped-types';
import { CreateStudentInputDto } from './create-student.dto';

export class UpdateStudentInputDto extends PartialType(CreateStudentInputDto) {}
