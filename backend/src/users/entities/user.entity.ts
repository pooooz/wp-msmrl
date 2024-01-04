import { ApiProperty } from '@nestjs/swagger';
import { UserRole } from 'src/common/contracts/enums/user-role.enum';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    example: 1,
    description: 'User id',
  })
  id: number;

  @Column({
    unique: true,
  })
  @ApiProperty({
    example: 'MyLogin',
    description: 'User login',
  })
  login: string;

  @Column({ select: false })
  @ApiProperty({
    example: 'MyPassword',
    description: 'User password',
  })
  password: string;

  @Column({
    type: 'enum',
    enum: UserRole,
    default: UserRole.Teacher,
  })
  @ApiProperty({
    example: UserRole.Teacher,
    description: 'User role type',
    enum: UserRole,
  })
  role: UserRole;
}
