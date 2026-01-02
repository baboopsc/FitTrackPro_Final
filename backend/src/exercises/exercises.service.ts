import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exercise } from '../entities/exercise.entity';

@Injectable()
export class ExercisesService {
  constructor(
    @InjectRepository(Exercise) private exerciseRepository: Repository<Exercise>,
  ) {}

  findAll() { return this.exerciseRepository.find(); }
  
  create(dto: any) {
    const exercise = this.exerciseRepository.create(dto);
    return this.exerciseRepository.save(exercise);
  }

  async remove(id: number) {
    return this.exerciseRepository.delete(id);
  }

  async update(id: number, dto: any) {
    return this.exerciseRepository.update(id, dto);
  }
}
