import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { WorkoutsModule } from './workouts/workouts.module';
import { ExercisesModule } from './exercises/exercises.module';
import { ProgressModule } from './progress/progress.module';
import { NutritionModule } from './nutrition/nutrition.module'; // YENİ
import { User } from './entities/user.entity';
import { Workout } from './entities/workout.entity';
import { Exercise } from './entities/exercise.entity';
import { WorkoutExercise } from './entities/workout-exercise.entity';
import { UserProgress } from './entities/user-progress.entity';
import { Review } from './entities/review.entity';
import { NutritionPlan } from './entities/nutrition-plan.entity';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'fittrack.db',
      entities: [User, Workout, Exercise, WorkoutExercise, UserProgress, Review, NutritionPlan],
      synchronize: true,
    }),
    AuthModule, UsersModule, WorkoutsModule, ExercisesModule, ProgressModule, NutritionModule
  ],
})
export class AppModule {}
