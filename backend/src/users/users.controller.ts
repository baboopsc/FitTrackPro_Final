import { Controller, Get, Delete, Put, Param, Body } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get() findAll() { return this.usersService.findAll(); }
  @Delete(':id') remove(@Param('id') id: string) { return this.usersService.remove(+id); }
  
  // DÜZENLEME EKLENDİ
  @Put(':id') update(@Param('id') id: string, @Body() dto: any) { return this.usersService.update(+id, dto); }
}
