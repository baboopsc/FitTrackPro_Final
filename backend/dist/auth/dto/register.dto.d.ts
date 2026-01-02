import { UserRole } from '../../shared/roles.enum';
export declare class RegisterDto {
    email: string;
    password: string;
    name: string;
    role?: UserRole;
    height?: number;
    weight?: number;
    age?: number;
    fitnessGoal?: string;
}
