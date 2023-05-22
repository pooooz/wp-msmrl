import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Group } from './Group';
import { Result } from './Result';

@Entity('student')
export class Student extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  first_name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  patronumic: string;

  @Column({ type: 'varchar', length: 255 })
  last_name: string;

  @ManyToOne(() => Group, (group) => group.students)
  group: Group;

  @OneToMany(() => Result, (result) => result.student)
  results: Result[];
}
