import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Specialization as SpecializationEnity } from './entities/specialization.entity';
import { SpecializationsController } from './specializations.controller';
import { SpecializationsService } from './specializations.service';

@Module({
  imports: [TypeOrmModule.forFeature([SpecializationEnity])],
  controllers: [SpecializationsController],
  providers: [SpecializationsService],
  exports: [SpecializationsService],
})
export class SpecializationsModule {}
