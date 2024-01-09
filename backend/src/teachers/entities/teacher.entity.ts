import { ApiProperty } from '@nestjs/swagger';
import { DisciplineTeacher } from 'src/discipline-teachers/entities/discipline-teachers.entity';
import { Task } from 'src/tasks/entities/tasks.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Teacher {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'Admin id',
  })
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  patronymic: string;

  @OneToOne(() => User, { nullable: false, cascade: true, onDelete: 'CASCADE' })
  @JoinColumn()
  user: User;

  @OneToMany(
    () => DisciplineTeacher,
    (disciplineTeacher) => disciplineTeacher.teacher,
  )
  disciplineTeachers: Array<DisciplineTeacher>;

  @OneToMany(() => Task, (task) => task.creator)
  tasks: Array<Task>;
}
