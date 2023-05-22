import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CurrentDiscipline } from './CurrentDiscipline';
import { Result } from './Result';
import { Teacher } from './Teacher';

export enum TaskEvaluationScaleEnum {
  TEN_POINT = 'ten-point',
  CREDIT = 'credit',
}

@Entity('task')
export class Task extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @ManyToOne(() => CurrentDiscipline, (currentDiscipline) => currentDiscipline.tasks)
  @JoinColumn()
  current_discipline: CurrentDiscipline;

  @ManyToOne(() => Teacher, (teacher) => teacher.tasks)
  @JoinColumn()
  creator: Teacher;

  @Column({ type: 'enum', enum: TaskEvaluationScaleEnum })
  evaluation_scale: string;

  @Column({ type: 'boolean' })
  mandatory: boolean;

  @OneToMany(() => Result, (result) => result.task)
  results: Result[];
}
