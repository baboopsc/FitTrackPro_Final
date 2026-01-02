import { Strategy } from 'passport-jwt';
import { ConfigService } from '@nestjs/config';
import { User } from '../../entities/user.entity';
import { Repository } from 'typeorm';
import { JwtPayload } from '../interfaces/jwt-payload.interface';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private usersRepo;
    constructor(configService: ConfigService, usersRepo: Repository<User>);
    validate(payload: JwtPayload): Promise<User>;
}
export {};
