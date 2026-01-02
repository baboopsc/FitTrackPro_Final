import { UserRole } from '../../shared/roles.enum';
export declare class CreateUserDto {
    email: string;
    password: string;
    name: string;
    role?: UserRole;
}
