import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User as UserEnity } from './entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([UserEnity])],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
