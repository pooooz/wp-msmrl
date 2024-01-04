import { Module } from '@nestjs/common';
import { DisciplinesService } from './disciplines.service';
import { DisciplinesController } from './disciplines.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Discipline as DisciplineEnity } from './entities/discipline.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DisciplineEnity])],
  controllers: [DisciplinesController],
  providers: [DisciplinesService],
  exports: [DisciplinesService],
})
export class DisciplinesModule {}
