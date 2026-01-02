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
exports.UserProgress = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("./user.entity");
const workout_entity_1 = require("./workout.entity");
let UserProgress = class UserProgress {
};
exports.UserProgress = UserProgress;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], UserProgress.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], UserProgress.prototype, "date", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], UserProgress.prototype, "duration", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], UserProgress.prototype, "caloriesBurned", void 0);
__decorate([
    (0, typeorm_1.Column)("float", { default: 0 }),
    __metadata("design:type", Number)
], UserProgress.prototype, "weight", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], UserProgress.prototype, "notes", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.progress, { onDelete: 'CASCADE' }),
    __metadata("design:type", user_entity_1.User)
], UserProgress.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => workout_entity_1.Workout, (workout) => workout.progressRecords, { onDelete: 'SET NULL' }),
    __metadata("design:type", workout_entity_1.Workout)
], UserProgress.prototype, "workout", void 0);
exports.UserProgress = UserProgress = __decorate([
    (0, typeorm_1.Entity)()
], UserProgress);
//# sourceMappingURL=user-progress.entity.js.map