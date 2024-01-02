import { ApiProperty } from '@nestjs/swagger';

import { Group } from 'src/groups/entities/group.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Specialization {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'Admin id',
  })
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Group, (group) => group.specialization)
  groups: Array<Group>;
}
