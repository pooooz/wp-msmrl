import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CurrentDiscipline as CurrentDisciplineEnity } from './entities/current-discipline.entity';
import { CurrentDisciplinesController } from './current-disciplines.controller';
import { CurrentDisciplinesService } from './current-disciplines.service';
import { DisciplinesModule } from 'src/disciplines/disciplines.module';
import { GroupsModule } from 'src/groups/group.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([CurrentDisciplineEnity]),
    DisciplinesModule,
    GroupsModule,
  ],
  controllers: [CurrentDisciplinesController],
  providers: [CurrentDisciplinesService],
  exports: [CurrentDisciplinesService],
})
export class CurrentDisciplinesModule {}
