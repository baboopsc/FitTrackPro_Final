import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from './user.entity';
import { Workout } from './workout.entity';

@Entity()
export class Review {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  comment: string;

  @Column()
  rating: number; // 1-5 yıldız

  @CreateDateColumn()
  date: Date;

  @ManyToOne(() => User, user => user.reviews, { eager: true })
  user: User;

  @ManyToOne(() => Workout, workout => workout.reviews)
  workout: Workout;
}
