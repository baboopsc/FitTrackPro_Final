import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService, @InjectRepository(User) private usersRepo: Repository<User>) {
    super({ jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), ignoreExpiration: false, secretOrKey: configService.get('JWT_SECRET') || 'secret' });
  }
  async validate(payload: JwtPayload): Promise<User> {
    const user = await this.usersRepo.findOne({ where: { id: payload.sub }, select: ['id', 'email', 'name', 'role', 'isActive'] });
    if (!user || !user.isActive) throw new UnauthorizedException();
    return user;
  }
}
