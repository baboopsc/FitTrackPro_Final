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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = void 0;
const typeorm_1 = require("typeorm");
const workout_exercise_entity_1 = require("./workout-exercise.entity");
const user_progress_entity_1 = require("./user-progress.entity");
const review_entity_1 = require("./review.entity");
const user_entity_1 = require("./user.entity");
let Workout = class Workout {
};
exports.Workout = Workout;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Workout.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Workout.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Workout.prototype, "description", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Workout.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)({ default: 3 }),
    __metadata("design:type", Number)
], Workout.prototype, "frequency", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Workout.prototype, "difficulty", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Workout.prototype, "calories", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.createdWorkouts),
    __metadata("design:type", user_entity_1.User)
], Workout.prototype, "trainer", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => workout_exercise_entity_1.WorkoutExercise, (we) => we.workout),
    __metadata("design:type", Array)
], Workout.prototype, "workoutExercises", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => user_progress_entity_1.UserProgress, (progress) => progress.workout),
    __metadata("design:type", Array)
], Workout.prototype, "progressRecords", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => review_entity_1.Review, (review) => review.workout),
    __metadata("design:type", Array)
], Workout.prototype, "reviews", void 0);
exports.Workout = Workout = __decorate([
    (0, typeorm_1.Entity)()
], Workout);
//# sourceMappingURL=workout.entity.js.map