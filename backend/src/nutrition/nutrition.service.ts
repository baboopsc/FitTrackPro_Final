import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NutritionPlan } from '../entities/nutrition-plan.entity';

@Injectable()
export class NutritionService {
  constructor(
    @InjectRepository(NutritionPlan)
    private repo: Repository<NutritionPlan>,
  ) {}

  findAll() { return this.repo.find(); }
  create(dto: any) { return this.repo.save(this.repo.create(dto)); }
  remove(id: number) { return this.repo.delete(id); }
  
  // GÜNCELLEME İŞLEMİ
  update(id: number, dto: any) { return this.repo.update(id, dto); }
}
