import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CurrentDiscipline } from './CurrentDiscipline';
import { Teacher } from './Teacher';

export enum FormOfConductingClasses {
  LECTURE = 'lecture',
  LABORATORY = 'laboratory',
  PRACTICE = 'practice',
}

@Entity('discipline_teacher')
export class DisciplineTeacher extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => CurrentDiscipline, (currentDiscipline) => currentDiscipline.discipline_teachers)
  current_discipline: CurrentDiscipline;

  @ManyToOne(() => Teacher, (teacher) => teacher.discipline_teachers)
  teacher: Teacher;

  @Column({ type: 'enum', enum: FormOfConductingClasses })
  form_of_conducting_classes: string;
}
