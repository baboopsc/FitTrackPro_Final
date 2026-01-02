import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserProgress } from '../entities/user-progress.entity';

@Injectable()
export class ProgressService {
  constructor(
    @InjectRepository(UserProgress)
    private progressRepo: Repository<UserProgress>,
  ) {}

  // KANKA ARTIK ANTRENMAN İSMİNİ DE GETİRECEK (relations: workout)
  findAll() {
    return this.progressRepo.find({
      relations: ['user', 'workout'],
      order: { date: 'DESC' }
    });
  }

  create(dto: any) {
    const progress = this.progressRepo.create(dto);
    return this.progressRepo.save(progress);
  }

  // İSTATİSTİK HESAPLAMA MOTORU (Düzeltildi)
  async getStatistics(userId: number) {
    const userStats = await this.progressRepo.find({ 
      where: { user: { id: userId } },
      relations: ['workout'],
      order: { date: 'ASC' }
    });

    // 1. Toplam Antrenman Sayısı
    const totalWorkouts = userStats.filter(s => s.workout).length;

    // 2. Toplam Süre (Dakikaları topluyoruz artık kanka)
    const totalDuration = userStats.reduce((acc, curr) => acc + (curr.duration || 0), 0);

    // 3. Toplam Kalori
    const totalCalories = userStats.reduce((acc, curr) => acc + (curr.caloriesBurned || 0), 0);

    // 4. Grafik İçin Kilo Verisi (Sadece kilosu olan kayıtlar)
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
      weeklyCompletion: weightHistory // Grafik verisi buradan gidiyor
    };
  }
}
