import { ApiProperty } from '@nestjs/swagger';
import { Student } from 'src/students/entities/student.entity';
import { Task } from 'src/tasks/entities/tasks.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({})
export class Result {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'Result id',
  })
  id: number;

  @ManyToOne(() => Student, (student) => student.results)
  student: Student;

  @ManyToOne(() => Task, (task) => task.results)
  task: Task;

  @Column({ type: 'smallint' })
  mark: number;

  @Column({ nullable: true })
  comment?: string;

  @CreateDateColumn({ type: 'timestamptz' })
  date: Date;
}
