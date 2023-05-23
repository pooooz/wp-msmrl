import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

export enum UserRoleEnum {
  ADMIN = 'admin',
  TEACHER = 'teacher',
}

@Entity('user')
export class User extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  login: string;

  @Column({ type: 'varchar', length: 255 })
  password: string;

  @Column({ type: 'enum', enum: UserRoleEnum })
  role: string;
}
