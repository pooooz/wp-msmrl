import {
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsPositive,
} from 'class-validator';

import { FormOfConductingClasses } from 'src/common/contracts/enums/form-of-conducting-classes.enum';

export class CreateDisciplineTeacherInputDto {
  @IsNumber()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  currentDisciplineId: number;

  @IsNumber()
  @IsNotEmpty()
  @IsInt()
  @IsPositive()
  teacherId: number;

  @IsEnum(FormOfConductingClasses)
  @IsNotEmpty()
  formOfConductingClasses: FormOfConductingClasses;
}
