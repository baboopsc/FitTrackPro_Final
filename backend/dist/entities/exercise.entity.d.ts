import { WorkoutExercise } from './workout-exercise.entity';
export declare class Exercise {
    id: number;
    name: string;
    muscleGroup: string;
    description: string;
    videoUrl: string;
    workoutExercises: WorkoutExercise[];
}
