"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const auth_module_1 = require("./auth/auth.module");
const users_module_1 = require("./users/users.module");
const workouts_module_1 = require("./workouts/workouts.module");
const exercises_module_1 = require("./exercises/exercises.module");
const progress_module_1 = require("./progress/progress.module");
const nutrition_module_1 = require("./nutrition/nutrition.module");
const user_entity_1 = require("./entities/user.entity");
const workout_entity_1 = require("./entities/workout.entity");
const exercise_entity_1 = require("./entities/exercise.entity");
const workout_exercise_entity_1 = require("./entities/workout-exercise.entity");
const user_progress_entity_1 = require("./entities/user-progress.entity");
const review_entity_1 = require("./entities/review.entity");
const nutrition_plan_entity_1 = require("./entities/nutrition-plan.entity");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({ isGlobal: true }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'sqlite',
                database: 'fittrack.db',
                entities: [user_entity_1.User, workout_entity_1.Workout, exercise_entity_1.Exercise, workout_exercise_entity_1.WorkoutExercise, user_progress_entity_1.UserProgress, review_entity_1.Review, nutrition_plan_entity_1.NutritionPlan],
                synchronize: true,
            }),
            auth_module_1.AuthModule, users_module_1.UsersModule, workouts_module_1.WorkoutsModule, exercises_module_1.ExercisesModule, progress_module_1.ProgressModule, nutrition_module_1.NutritionModule
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map