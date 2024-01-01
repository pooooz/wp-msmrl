import { ApiProperty } from '@nestjs/swagger';
import { DisciplineControlForm } from 'src/common/contracts';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Discipline {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'Discipline id',
  })
  id: number;

  @Column()
  @ApiProperty({
    example: 'Math',
    description: 'Math name',
  })
  name: string;

  @Column({
    type: 'enum',
    enum: DisciplineControlForm,
  })
  @ApiProperty({
    example: DisciplineControlForm.DifferentiatedCredit,
    description: 'Discipline control form type',
    enum: DisciplineControlForm,
  })
  controlForm: DisciplineControlForm;
}
