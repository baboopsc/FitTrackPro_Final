import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
export declare class UsersService {
    private usersRepository;
    constructor(usersRepository: Repository<User>);
    findOne(email: string): Promise<User | undefined>;
    create(user: User): Promise<User>;
    findAll(): Promise<User[]>;
    remove(id: number): Promise<import("typeorm").DeleteResult>;
    update(id: number, dto: any): Promise<import("typeorm").UpdateResult>;
}
