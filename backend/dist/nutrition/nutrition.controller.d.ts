import { NutritionService } from './nutrition.service';
export declare class NutritionController {
    private readonly service;
    constructor(service: NutritionService);
    findAll(): Promise<import("../entities/nutrition-plan.entity").NutritionPlan[]>;
    create(dto: any): Promise<import("../entities/nutrition-plan.entity").NutritionPlan[]>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
    update(id: string, dto: any): Promise<import("typeorm").UpdateResult>;
}
