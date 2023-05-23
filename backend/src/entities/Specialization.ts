import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Group } from './Group';

@Entity('specialization')
export class Specialization extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @OneToMany(() => Group, (group) => group.specialization)
  groups: Group[];
}
