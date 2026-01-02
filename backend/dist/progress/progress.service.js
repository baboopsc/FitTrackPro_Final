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
exports.ProgressService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const user_progress_entity_1 = require("../entities/user-progress.entity");
let ProgressService = class ProgressService {
    constructor(progressRepo) {
        this.progressRepo = progressRepo;
    }
    findAll() {
        return this.progressRepo.find({
            relations: ['user', 'workout'],
            order: { date: 'DESC' }
        });
    }
    create(dto) {
        const progress = this.progressRepo.create(dto);
        return this.progressRepo.save(progress);
    }
    async getStatistics(userId) {
        const userStats = await this.progressRepo.find({
            where: { user: { id: userId } },
            relations: ['workout'],
            order: { date: 'ASC' }
        });
        const totalWorkouts = userStats.filter(s => s.workout).length;
        const totalDuration = userStats.reduce((acc, curr) => acc + (curr.duration || 0), 0);
        const totalCalories = userStats.reduce((acc, curr) => acc + (curr.caloriesBurned || 0), 0);
        const weightHistory = userStats
            .filter(s => s.weight > 0)
            .map(s => ({
            date: s.date,
            weight: s.weight,
            calories: s.caloriesBurned
        }));
        return {
            totalWorkouts,
            totalDuration,
            totalCalories,
            weeklyCompletion: weightHistory
        };
    }
};
exports.ProgressService = ProgressService;
exports.ProgressService = ProgressService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(user_progress_entity_1.UserProgress)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], ProgressService);
//# sourceMappingURL=progress.service.js.map