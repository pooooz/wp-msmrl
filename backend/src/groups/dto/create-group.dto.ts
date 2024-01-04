import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateGroupInputDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsNumber()
  @IsInt()
  @IsPositive()
  @ApiProperty()
  course: number;

  @IsNumber()
  @IsInt()
  @IsPositive()
  @ApiProperty()
  specializationId: number;
}
