import { IsEmail, IsString, MinLength, IsEnum, IsOptional } from 'class-validator';
import { UserRole } from '../../shared/roles.enum';
export class CreateUserDto {
  @IsEmail() email: string;
  @IsString() @MinLength(6) password: string;
  @IsString() name: string;
  @IsEnum(UserRole) @IsOptional() role?: UserRole = UserRole.MEMBER;
}
