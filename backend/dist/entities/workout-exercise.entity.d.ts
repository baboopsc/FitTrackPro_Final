import { Workout } from './workout.entity';
import { Exercise } from './exercise.entity';
export declare class WorkoutExercise {
    id: number;
    sets: number;
    reps: number;
    restTime: number;
    notes: string;
    order: number;
    workout: Workout;
    exercise: Exercise;
}
