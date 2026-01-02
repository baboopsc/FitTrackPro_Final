import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProgressService } from './progress.service';
import { ProgressController } from './progress.controller';
import { UserProgress } from '../entities/user-progress.entity';
import { Workout } from '../entities/workout.entity';
@Module({
  imports: [TypeOrmModule.forFeature([UserProgress, Workout])],
  controllers: [ProgressController],
  providers: [ProgressService],
  exports: [ProgressService]
})
export class ProgressModule {}
