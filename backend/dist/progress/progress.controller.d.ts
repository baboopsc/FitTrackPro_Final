import { ProgressService } from './progress.service';
export declare class ProgressController {
    private readonly progressService;
    constructor(progressService: ProgressService);
    findAll(): Promise<import("../entities/user-progress.entity").UserProgress[]>;
    create(dto: any): Promise<import("../entities/user-progress.entity").UserProgress[]>;
    getStats(userId: string): Promise<{
        totalWorkouts: number;
        totalDuration: number;
        totalCalories: number;
        weeklyCompletion: {
            date: Date;
            weight: number;
            calories: number;
        }[];
    }>;
}
