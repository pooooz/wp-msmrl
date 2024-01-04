import { ApiProperty } from '@nestjs/swagger';
import { User } from 'src/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Admin {
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
}
