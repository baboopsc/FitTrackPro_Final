import { Repository } from 'typeorm';
import { UserProgress } from '../entities/user-progress.entity';
export declare class ProgressService {
    private progressRepo;
    constructor(progressRepo: Repository<UserProgress>);
    findAll(): Promise<UserProgress[]>;
    create(dto: any): Promise<UserProgress[]>;
    getStatistics(userId: number): Promise<{
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
