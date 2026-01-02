import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { WorkoutExercise } from './workout-exercise.entity';

@Entity()
export class Exercise {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  muscleGroup: string;

  @Column({ nullable: true })
  description: string;

  @Column({ nullable: true })
  videoUrl: string;

  // Kanka burası önemli: Direkt Workout'a değil, Junction Table'a bağlanıyoruz
  @OneToMany(() => WorkoutExercise, (workoutExercise) => workoutExercise.exercise)
  workoutExercises: WorkoutExercise[];
}
