import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Group as GroupEnity } from './entities/group.entity';
import { GroupsController } from './group.controller';
import { GroupsService } from './group.service';
import { SpecializationsModule } from 'src/specializations/specializations.module';

@Module({
  imports: [TypeOrmModule.forFeature([GroupEnity]), SpecializationsModule],
  controllers: [GroupsController],
  providers: [GroupsService],
  exports: [GroupsService],
})
export class GroupsModule {}
