import { PartialType } from '@nestjs/mapped-types';
import { CreateSpecializationInputDto } from './create-specialization.dto';

export class UpdateSpecializationInputDto extends PartialType(
  CreateSpecializationInputDto,
) {}
