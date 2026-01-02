import { User } from './user.entity';
import { Workout } from './workout.entity';
export declare class UserProgress {
    id: number;
    date: Date;
    duration: number;
    caloriesBurned: number;
    weight: number;
    notes: string;
    user: User;
    workout: Workout;
}
