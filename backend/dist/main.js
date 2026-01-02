"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const common_1 = require("@nestjs/common");
const app_module_1 = require("./app.module");
const typeorm_1 = require("@nestjs/typeorm");
const user_entity_1 = require("./entities/user.entity");
const exercise_entity_1 = require("./entities/exercise.entity");
const workout_entity_1 = require("./entities/workout.entity");
const workout_exercise_entity_1 = require("./entities/workout-exercise.entity");
const roles_enum_1 = require("./shared/roles.enum");
const bcrypt = require("bcrypt");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.useGlobalPipes(new common_1.ValidationPipe({ whitelist: true, transform: true }));
    app.enableCors();
    app.setGlobalPrefix('api');
    const userRepo = app.get((0, typeorm_1.getRepositoryToken)(user_entity_1.User));
    const exRepo = app.get((0, typeorm_1.getRepositoryToken)(exercise_entity_1.Exercise));
    const workoutRepo = app.get((0, typeorm_1.getRepositoryToken)(workout_entity_1.Workout));
    const weRepo = app.get((0, typeorm_1.getRepositoryToken)(workout_exercise_entity_1.WorkoutExercise));
    if (await userRepo.count() === 0) {
        const hashedPw = await bcrypt.hash('123456', 10);
        const admin = await userRepo.save(userRepo.create({ email: 'admin@fittrack.com', password: hashedPw, name: 'Admin Kanka', role: roles_enum_1.UserRole.ADMIN }));
        const trainer = await userRepo.save(userRepo.create({ email: 'hoca@fittrack.com', password: hashedPw, name: 'Hoca Dehşet', role: roles_enum_1.UserRole.TRAINER }));
        const member = await userRepo.save(userRepo.create({ email: 'uye@fittrack.com', password: hashedPw, name: 'Uye Kanka', role: roles_enum_1.UserRole.MEMBER }));
        const ex1 = await exRepo.save({ name: 'Push Up', muscleGroup: 'Chest', description: 'Temel göğüs hareketi' });
        const ex2 = await exRepo.save({ name: 'Squat', muscleGroup: 'Legs', description: 'Temel bacak hareketi' });
        const workout = await workoutRepo.save({
            name: 'Full Body Blast',
            description: 'Tüm vücudu çalıştıran başlangıç programı',
            duration: 45,
            difficulty: 'Medium',
            calories: 300,
            trainer: trainer
        });
        await weRepo.save({ workout: workout, exercise: ex1, sets: 3, reps: 12 });
        await weRepo.save({ workout: workout, exercise: ex2, sets: 4, reps: 10 });
        console.log('✅ Veritabanı FULL+FULL dolduruldu! Üye: uye@fittrack.com / 123456');
    }
    await app.listen(3001);
}
bootstrap();
//# sourceMappingURL=main.js.map