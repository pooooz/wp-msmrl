import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { DisciplineControlForm, UserRole } from 'src/common/contracts';

export class CreateDisciplineInputDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;

  @IsEnum(DisciplineControlForm)
  @ApiProperty({
    enum: DisciplineControlForm,
  })
  controlForm: DisciplineControlForm;
}
