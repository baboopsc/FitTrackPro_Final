import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Workout } from '../entities/workout.entity';
import { WorkoutExercise } from '../entities/workout-exercise.entity';
import { Review } from '../entities/review.entity';

@Injectable()
export class WorkoutsService {
  constructor(
    @InjectRepository(Workout) private workoutRepo: Repository<Workout>,
    @InjectRepository(WorkoutExercise) private weRepo: Repository<WorkoutExercise>,
    @InjectRepository(Review) private reviewRepo: Repository<Review>
  ) {}

  findAll() { return this.workoutRepo.find({ relations: ['workoutExercises', 'workoutExercises.exercise'] }); }
  
  async create(dto: any) {
    const { exerciseIds, ...workoutDetails } = dto;
    const saved = await this.workoutRepo.save(this.workoutRepo.create(workoutDetails)) as unknown as Workout;
    if (exerciseIds) {
      for (const exId of exerciseIds) {
        await this.weRepo.save(this.weRepo.create({ workout: { id: saved.id }, exercise: { id: exId }, sets: 3, reps: 12 }));
      }
    }
    return saved;
  }

  findOne(id: number) { return this.workoutRepo.findOne({ where: { id }, relations: ['workoutExercises', 'workoutExercises.exercise', 'reviews', 'reviews.user'] }); }
  
  async remove(id: number) {
    await this.weRepo.delete({ workout: { id } });
    await this.reviewRepo.delete({ workout: { id } });
    return this.workoutRepo.delete(id);
  }

  async addReview(dto: any) {
    const review = this.reviewRepo.create({ comment: dto.comment, rating: dto.rating, workout: { id: dto.workoutId }, user: { id: dto.userId } });
    return this.reviewRepo.save(review);
  }

  getStatistics() { return this.workoutRepo.count().then(c => ({ totalWorkouts: c })); }

  // GÜNCELLEME
  async update(id: number, dto: any) {
    // Sadece metadataları güncelle (İsim, Süre, Sıklık vb.)
    return this.workoutRepo.update(id, dto);
  }
}
