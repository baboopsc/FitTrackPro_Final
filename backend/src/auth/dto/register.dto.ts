import { IsEmail, IsString, MinLength, IsEnum, IsOptional } from 'class-validator';
import { UserRole } from '../../shared/roles.enum';
export class RegisterDto {
  @IsEmail() email: string;
  @IsString() @MinLength(6) password: string;
  @IsString() name: string;
  @IsEnum(UserRole) @IsOptional() role?: UserRole = UserRole.MEMBER;
  @IsOptional() height?: number;
  @IsOptional() weight?: number;
  @IsOptional() age?: number;
  @IsOptional() fitnessGoal?: string;
}
