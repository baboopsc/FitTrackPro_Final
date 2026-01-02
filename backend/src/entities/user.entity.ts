import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { UserProgress } from './user-progress.entity';
import { Review } from './review.entity';
import { Workout } from './workout.entity';
import { NutritionPlan } from './nutrition-plan.entity'; // YENİ IMPORT

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column({ default: 'member' })
  role: string;

  @Column({ default: true })
  isActive: boolean;

  @OneToMany(() => UserProgress, (progress) => progress.user)
  progress: UserProgress[];

  @OneToMany(() => Review, (review) => review.user)
  reviews: Review[];

  @OneToMany(() => Workout, (workout) => workout.trainer)
  createdWorkouts: Workout[];

  // KANKA İŞTE BU EKSİKTİ: Kullanıcının seçtiği beslenme planı
  // { eager: true } sayesinde kullanıcıyı çektiğimizde plan bilgisi de otomatik gelecek
  @ManyToOne(() => NutritionPlan, { nullable: true, eager: true }) 
  @JoinColumn({ name: 'activeNutritionPlanId' })
  activeNutritionPlan: NutritionPlan;
}
