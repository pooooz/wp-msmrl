import { BaseEntity, Column, Entity, JoinColumn, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from './User';

@Entity('admin')
export class Admin extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  first_name: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  patronumic: string;

  @Column({ type: 'varchar', length: 255 })
  last_name: string;

  @OneToOne(() => User, { nullable: false, cascade:true, onDelete:"CASCADE"})
  @JoinColumn()
  user: User;
}
