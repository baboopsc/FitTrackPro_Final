import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { NutritionPlan } from '../entities/nutrition-plan.entity';
import { NutritionController } from './nutrition.controller';
import { NutritionService } from './nutrition.service';

@Module({
  imports: [TypeOrmModule.forFeature([NutritionPlan])],
  controllers: [NutritionController],
  providers: [NutritionService],
})
export class NutritionModule {}
