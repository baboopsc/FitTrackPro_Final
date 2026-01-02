import { Repository } from 'typeorm';
import { Exercise } from '../entities/exercise.entity';
export declare class ExercisesService {
    private exerciseRepository;
    constructor(exerciseRepository: Repository<Exercise>);
    findAll(): Promise<Exercise[]>;
    create(dto: any): Promise<Exercise[]>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    update(id: number, dto: any): Promise<import("typeorm").UpdateResult>;
}
