import { PartialType } from '@nestjs/mapped-types';
import { CreateResultInputDto } from './create-result.dto';

export class UpdateResultInputDto extends PartialType(CreateResultInputDto) {}
