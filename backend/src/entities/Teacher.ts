import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DisciplineTeacher } from './DisciplineTeacher';
import { Task } from './Task';
import { User } from './User';

@Entity('teacher')
export class Teacher extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  first_name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  patronumic: string;

  @Column({ type: 'varchar', length: 255 })
  last_name: string;

  @OneToOne(() => User, { nullable: false, onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @OneToMany(() => DisciplineTeacher, (disciplineTeacher) => disciplineTeacher.teacher)
  discipline_teachers: DisciplineTeacher[];

  @OneToMany(() => Task, (task) => task.creator)
  tasks: Task[];
}
