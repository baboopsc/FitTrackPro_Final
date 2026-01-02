import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from 'typeorm';
import { WorkoutExercise } from './workout-exercise.entity';
import { UserProgress } from './user-progress.entity';
import { Review } from './review.entity';
import { User } from './user.entity';

@Entity()
export class Workout {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  duration: number; // İdeal süre (dk)

  @Column({ default: 3 })
  frequency: number; // Haftada kaç gün?

  @Column()
  difficulty: string;

  @Column()
  calories: number;

  // Antrenmanı oluşturan Antrenör (Trainer)
  @ManyToOne(() => User, (user) => user.createdWorkouts)
  trainer: User;

  // Antrenmana bağlı egzersizler (Junction Table)
  @OneToMany(() => WorkoutExercise, (we) => we.workout)
  workoutExercises: WorkoutExercise[];

  // Bu antrenman kullanılarak yapılan ilerleme kayıtları (BU EKSİKTİ)
  @OneToMany(() => UserProgress, (progress) => progress.workout)
  progressRecords: UserProgress[];

  // Antrenmana yapılan yorumlar (BU DA EKSİKTİ)
  @OneToMany(() => Review, (review) => review.workout)
  reviews: Review[];
}
