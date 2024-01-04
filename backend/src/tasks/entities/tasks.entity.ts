import { ApiProperty } from '@nestjs/swagger';
import { TaskEvaluationScale } from 'src/common/contracts/enums/task-evaluation-scale.enum';
import { CurrentDiscipline } from 'src/current-disciplines/entities/current-discipline.entity';
import { Result } from 'src/results/entities/result.entity';
import { Teacher } from 'src/teachers/entities/teacher.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Task {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'Task id',
  })
  id: number;

  @Column()
  name: string;

  @ManyToOne(
    () => CurrentDiscipline,
    (currentDiscipline) => currentDiscipline.tasks,
  )
  @JoinColumn()
  currentDiscipline: CurrentDiscipline;

  @ManyToOne(() => Teacher, (teacher) => teacher.tasks)
  @JoinColumn()
  creator: Teacher;

  @Column({ type: 'enum', enum: TaskEvaluationScale })
  evaluationScale: TaskEvaluationScale;

  @Column({ type: 'boolean' })
  mandatory: boolean;

  @OneToMany(() => Result, (result) => result.task)
  results: Array<Result>;
}
