import { BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { CurrentDiscipline } from './CurrentDiscipline';
import { Specialization } from './Specialization';
import { Student } from './Student';

@Entity('group')
export class Group extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'smallint' })
  course: number;

  @ManyToOne(() => Specialization, (specialization) => specialization.groups)
  specialization: Specialization;

  @OneToMany(() => Student, (student) => student.group)
  students: Student[];

  @OneToMany(() => CurrentDiscipline, (currentDiscipline) => currentDiscipline.group)
  current_disciplines: CurrentDiscipline[];
}
