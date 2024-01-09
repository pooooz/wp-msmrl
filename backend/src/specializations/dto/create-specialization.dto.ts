import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateSpecializationInputDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  name: string;
}
