import { ApiProperty } from '@nestjs/swagger';
import { Group } from 'src/groups/entities/group.entity';
import { Result } from 'src/results/entities/result.entity';

import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Student {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'Student id',
  })
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  patronymic: string;

  @ManyToOne(() => Group, (group) => group.students)
  group: Group;

  @OneToMany(() => Result, (result) => result.student)
  results: Array<Result>;
}
