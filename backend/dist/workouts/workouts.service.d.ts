import { Repository } from 'typeorm';
import { Workout } from '../entities/workout.entity';
import { WorkoutExercise } from '../entities/workout-exercise.entity';
import { Review } from '../entities/review.entity';
export declare class WorkoutsService {
    private workoutRepo;
    private weRepo;
    private reviewRepo;
    constructor(workoutRepo: Repository<Workout>, weRepo: Repository<WorkoutExercise>, reviewRepo: Repository<Review>);
    findAll(): Promise<Workout[]>;
    create(dto: any): Promise<Workout>;
    findOne(id: number): Promise<Workout>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    addReview(dto: any): Promise<Review>;
    getStatistics(): Promise<{
        totalWorkouts: number;
    }>;
    update(id: number, dto: any): Promise<import("typeorm").UpdateResult>;
}
