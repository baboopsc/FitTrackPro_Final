import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WorkoutsService } from './workouts.service';
import { WorkoutsController } from './workouts.controller';
import { Workout } from '../entities/workout.entity';
import { WorkoutExercise } from '../entities/workout-exercise.entity';
import { Review } from '../entities/review.entity'; // YENİ: Review Import

@Module({
  // Kanka buraya Review ekleyerek servisin onu kullanmasına izin veriyoruz
  imports: [TypeOrmModule.forFeature([Workout, WorkoutExercise, Review])],
  controllers: [WorkoutsController],
  providers: [WorkoutsService],
})
export class WorkoutsModule {}
