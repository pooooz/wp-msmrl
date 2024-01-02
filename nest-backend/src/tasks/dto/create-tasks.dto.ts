import {
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTaskInputDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  @ApiProperty()
  currentDisciplineId: number;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  mandatory: boolean;
}
