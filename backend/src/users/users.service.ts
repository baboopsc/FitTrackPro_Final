import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private usersRepository: Repository<User>) {}

  async findOne(email: string): Promise<User | undefined> { return this.usersRepository.findOne({ where: { email } }); }
  async create(user: User): Promise<User> { return this.usersRepository.save(user); }
  findAll() { return this.usersRepository.find(); }
  async remove(id: number) { return this.usersRepository.delete(id); }
  
  // GÜNCELLEME METODU
  async update(id: number, dto: any) {
    return this.usersRepository.update(id, dto);
  }
}
