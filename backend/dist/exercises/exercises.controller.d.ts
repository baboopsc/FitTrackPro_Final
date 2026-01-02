import { ExercisesService } from './exercises.service';
export declare class ExercisesController {
    private readonly exercisesService;
    constructor(exercisesService: ExercisesService);
    findAll(): Promise<import("../entities/exercise.entity").Exercise[]>;
    create(dto: any): Promise<import("../entities/exercise.entity").Exercise[]>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
    update(id: string, dto: any): Promise<import("typeorm").UpdateResult>;
}
