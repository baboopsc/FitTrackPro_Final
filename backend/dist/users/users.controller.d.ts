import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    findAll(): Promise<import("../entities/user.entity").User[]>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
    update(id: string, dto: any): Promise<import("typeorm").UpdateResult>;
}
