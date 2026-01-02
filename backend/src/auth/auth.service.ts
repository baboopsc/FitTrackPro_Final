import { Injectable, UnauthorizedException, ConflictException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService
  ) {}

  async register(dto: any): Promise<any> {
    const existingUser = await this.userRepo.findOne({ where: { email: dto.email } });
    if (existingUser) throw new ConflictException('Bu email zaten kullanımda');

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const userInstance = this.userRepo.create({
      ...dto,
      password: hashedPassword,
      isActive: true
    });
    
    // Kanka buradaki 'any' ve tip zorlaması TypeScript'i susturacak tek yoldur
    const savedUser = await this.userRepo.save(userInstance as any) as unknown as User;
    
    const { password, ...result } = savedUser;
    return result;
  }

  async login(loginDto: any): Promise<any> {
    const user = await this.userRepo.findOne({ where: { email: loginDto.email } });
    if (!user) throw new UnauthorizedException('Kullanıcı veya şifre hatalı');

    const isMatch = await bcrypt.compare(loginDto.password, user.password);
    if (!isMatch) throw new UnauthorizedException('Kullanıcı veya şifre hatalı');

    const payload = { sub: user.id, email: user.email, role: user.role };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role
      }
    };
  }
}
