import { WorkoutsService } from './workouts.service';
export declare class WorkoutsController {
    private readonly workoutsService;
    constructor(workoutsService: WorkoutsService);
    findAll(): Promise<import("../entities/workout.entity").Workout[]>;
    getStats(): Promise<{
        totalWorkouts: number;
    }>;
    create(d: any): Promise<import("../entities/workout.entity").Workout>;
    findOne(id: string): Promise<import("../entities/workout.entity").Workout>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
    addReview(d: any): Promise<import("../entities/review.entity").Review>;
    update(id: string, d: any): Promise<import("typeorm").UpdateResult>;
}
