"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkoutsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const workout_entity_1 = require("../entities/workout.entity");
const workout_exercise_entity_1 = require("../entities/workout-exercise.entity");
const review_entity_1 = require("../entities/review.entity");
let WorkoutsService = class WorkoutsService {
    constructor(workoutRepo, weRepo, reviewRepo) {
        this.workoutRepo = workoutRepo;
        this.weRepo = weRepo;
        this.reviewRepo = reviewRepo;
    }
    findAll() { return this.workoutRepo.find({ relations: ['workoutExercises', 'workoutExercises.exercise'] }); }
    async create(dto) {
        const { exerciseIds, ...workoutDetails } = dto;
        const saved = await this.workoutRepo.save(this.workoutRepo.create(workoutDetails));
        if (exerciseIds) {
            for (const exId of exerciseIds) {
                await this.weRepo.save(this.weRepo.create({ workout: { id: saved.id }, exercise: { id: exId }, sets: 3, reps: 12 }));
            }
        }
        return saved;
    }
    findOne(id) { return this.workoutRepo.findOne({ where: { id }, relations: ['workoutExercises', 'workoutExercises.exercise', 'reviews', 'reviews.user'] }); }
    async remove(id) {
        await this.weRepo.delete({ workout: { id } });
        await this.reviewRepo.delete({ workout: { id } });
        return this.workoutRepo.delete(id);
    }
    async addReview(dto) {
        const review = this.reviewRepo.create({ comment: dto.comment, rating: dto.rating, workout: { id: dto.workoutId }, user: { id: dto.userId } });
        return this.reviewRepo.save(review);
    }
    getStatistics() { return this.workoutRepo.count().then(c => ({ totalWorkouts: c })); }
    async update(id, dto) {
        return this.workoutRepo.update(id, dto);
    }
};
exports.WorkoutsService = WorkoutsService;
exports.WorkoutsService = WorkoutsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(workout_entity_1.Workout)),
    __param(1, (0, typeorm_1.InjectRepository)(workout_exercise_entity_1.WorkoutExercise)),
    __param(2, (0, typeorm_1.InjectRepository)(review_entity_1.Review)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository])
], WorkoutsService);
//# sourceMappingURL=workouts.service.js.map