import { UserProgress } from './user-progress.entity';
import { Review } from './review.entity';
import { Workout } from './workout.entity';
import { NutritionPlan } from './nutrition-plan.entity';
export declare class User {
    id: number;
    name: string;
    email: string;
    password: string;
    role: string;
    isActive: boolean;
    progress: UserProgress[];
    reviews: Review[];
    createdWorkouts: Workout[];
    activeNutritionPlan: NutritionPlan;
}
