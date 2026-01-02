import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Workout } from './workout.entity';
import { Exercise } from './exercise.entity';

@Entity('workout_exercise_details')
export class WorkoutExercise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  sets: number;

  @Column()
  reps: number;

  @Column({ nullable: true })
  restTime: number;

  @Column({ nullable: true })
  notes: string;

  @Column({ default: 1 })
  order: number;

  @ManyToOne(() => Workout, (w) => w.workoutExercises, { onDelete: 'CASCADE' })
  workout: Workout;

  @ManyToOne(() => Exercise, (e) => e.workoutExercises, { onDelete: 'CASCADE' })
  exercise: Exercise;
}
