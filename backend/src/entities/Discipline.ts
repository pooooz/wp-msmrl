import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CurrentDiscipline } from './CurrentDiscipline';

export enum DisciplineControlFormEnum {
  EXAM = 'exam',
  CREDIT = 'credit',
  DIFFERENTIATED_CREDIT = 'differentiated credit',
}

@Entity('discipline')
export class Discipline extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'enum', enum: DisciplineControlFormEnum })
  control_form: string;

  @OneToMany(() => CurrentDiscipline, (currentDiscipline) => currentDiscipline.discipline)
  current_disciplines: CurrentDiscipline[];
}
