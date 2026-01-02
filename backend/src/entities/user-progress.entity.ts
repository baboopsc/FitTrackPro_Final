import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';
import { Workout } from './workout.entity';

@Entity()
export class UserProgress {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  date: Date;

  @Column({ nullable: true })
  duration: number; // dk

  @Column({ nullable: true })
  caloriesBurned: number;

  @Column("float", { default: 0 })
  weight: number; // O günkü kilo

  @Column({ nullable: true })
  notes: string;

  @ManyToOne(() => User, (user) => user.progress, { onDelete: 'CASCADE' })
  user: User;

  // Burası Workout entitysindeki "progressRecords" ile eşleşiyor
  @ManyToOne(() => Workout, (workout) => workout.progressRecords, { onDelete: 'SET NULL' })
  workout: Workout;
}
