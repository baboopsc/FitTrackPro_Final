import { User } from './user.entity';
import { Workout } from './workout.entity';
export declare class Review {
    id: number;
    comment: string;
    rating: number;
    date: Date;
    user: User;
    workout: Workout;
}
