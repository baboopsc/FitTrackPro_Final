import { WorkoutExercise } from './workout-exercise.entity';
import { UserProgress } from './user-progress.entity';
import { Review } from './review.entity';
import { User } from './user.entity';
export declare class Workout {
    id: number;
    name: string;
    description: string;
    duration: number;
    frequency: number;
    difficulty: string;
    calories: number;
    trainer: User;
    workoutExercises: WorkoutExercise[];
    progressRecords: UserProgress[];
    reviews: Review[];
}
