import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Discipline } from './Discipline';
import { DisciplineTeacher } from './DisciplineTeacher';
import { Group } from './Group';
import { Task } from './Task';

@Entity('current_discipline')
export class CurrentDiscipline extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Discipline, (discipline) => discipline.current_disciplines)
  discipline: Discipline;

  @ManyToOne(() => Group, (group) => group.current_disciplines)
  group: Group;

  @Column({ type: 'smallint' })
  year: number;

  @OneToMany(() => DisciplineTeacher, (disciplineTeacher) => disciplineTeacher.current_discipline)
  discipline_teachers: DisciplineTeacher[];

  @OneToMany(() => Task, (task) => task.current_discipline)
  tasks: Task[];
}
