import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { FormOfConductingClasses } from 'src/common/contracts/enums/form-of-conducting-classes.enum';
import { CurrentDiscipline } from 'src/current-disciplines/entities/current-discipline.entity';
import { Teacher } from 'src/teachers/entities/teacher.entity';

@Entity()
export class DisciplineTeacher {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'Discipline Teacher id',
  })
  id: number;

  @ManyToOne(
    () => CurrentDiscipline,
    (currentDiscipline) => currentDiscipline.disciplineTeachers,
  )
  currentDiscipline: CurrentDiscipline;

  @ManyToOne(() => Teacher, (teacher) => teacher.disciplineTeachers)
  teacher: Teacher;

  @Column({ type: 'enum', enum: FormOfConductingClasses })
  formOfConductingClasses: FormOfConductingClasses;
}
