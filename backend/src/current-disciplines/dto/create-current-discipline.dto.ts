import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateCurrentDisciplineInputDto {
  @IsNumber()
  @IsInt()
  @IsPositive()
  @ApiProperty()
  disciplineId: number;

  @IsNumber()
  @IsInt()
  @IsPositive()
  @ApiProperty()
  groupId: number;

  @IsNumber()
  @IsInt()
  @IsPositive()
  @ApiProperty()
  year: number;
}
