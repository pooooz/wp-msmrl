import { BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { CurrentDiscipline } from './CurrentDiscipline';
import { Student } from './Student';
import { Task } from './Task';

@Entity('result')
export class Result extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Student, (student) => student.results)
  student: Student;

  @ManyToOne(() => Task, (task) => task.results)
  task: Task;

  @Column({ type: 'smallint' })
  mark: number;

  @Column({ type: 'varchar', length: 255, nullable: true })
  comment: string;

  @Column({ type: 'timestamptz' })
  date: Date;
}
