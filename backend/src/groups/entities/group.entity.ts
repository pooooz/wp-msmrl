import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { CurrentDiscipline } from 'src/current-disciplines/entities/current-discipline.entity';
import { Specialization } from 'src/specializations/entities/specialization.entity';
import { Student } from 'src/students/entities/student.entity';

@Entity()
export class Group {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'Group id',
  })
  id: number;

  @Column({ unique: true })
  name: string;

  @Column({ type: 'smallint' })
  course: number;

  @ManyToOne(() => Specialization, (specialization) => specialization.groups)
  specialization: Specialization;

  @OneToMany(() => Student, (student) => student.group)
  students: Array<Student>;

  @OneToMany(
    () => CurrentDiscipline,
    (currentDiscipline) => currentDiscipline.group,
  )
  currentDisciplines: Array<CurrentDiscipline>;
}
