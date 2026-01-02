import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class NutritionPlan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // Örn: Kilo Verme Paketi

  @Column()
  description: string; // Amaç

  @Column("text")
  content: string; // YENİ: Yiyecekler, Sabah/Öğle/Akşam listesi

  @Column()
  calories: number;

  @Column()
  type: string; // Vegan, Ketojenik vb.
}
