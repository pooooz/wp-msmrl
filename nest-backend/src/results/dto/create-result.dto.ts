import {
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
  IsString,
} from 'class-validator';

export class CreateResultInputDto {
  @IsNumber()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  studentId: number;

  @IsNumber()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  taskId: number;

  @IsNumber()
  @IsNotEmpty()
  @IsInt()
  mark: number;

  @IsString()
  comment?: string;
}
