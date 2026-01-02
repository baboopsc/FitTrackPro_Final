import { Repository } from 'typeorm';
import { NutritionPlan } from '../entities/nutrition-plan.entity';
export declare class NutritionService {
    private repo;
    constructor(repo: Repository<NutritionPlan>);
    findAll(): Promise<NutritionPlan[]>;
    create(dto: any): Promise<NutritionPlan[]>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    update(id: number, dto: any): Promise<import("typeorm").UpdateResult>;
}
