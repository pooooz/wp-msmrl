import { ApiProperty } from '@nestjs/swagger';
import { DisciplineTeacher } from 'src/discipline-teachers/entities/discipline-teachers.entity';
import { Discipline } from 'src/disciplines/entities/discipline.entity';
import { Group } from 'src/groups/entities/group.entity';
import { Task } from 'src/tasks/entities/tasks.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class CurrentDiscipline {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'Current discipline id',
  })
  id: number;

  @ManyToOne(() => Discipline, (discipline) => discipline.currentDisciplines)
  discipline: Discipline;

  @ManyToOne(() => Group, (group) => group.currentDisciplines)
  group: Group;

  @Column({ type: 'smallint' })
  year: number;

  @OneToMany(
    () => DisciplineTeacher,
    (disciplineTeacher) => disciplineTeacher.currentDiscipline,
  )
  disciplineTeachers: Array<DisciplineTeacher>;

  @OneToMany(() => Task, (task) => task.creator)
  tasks: Array<Task>;
}
