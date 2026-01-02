import { Controller, Get, Post, Delete, Put, Body, Param } from '@nestjs/common';
import { NutritionService } from './nutrition.service';

@Controller('nutrition')
export class NutritionController {
  constructor(private readonly service: NutritionService) {}

  @Get() findAll() { return this.service.findAll(); }
  @Post() create(@Body() dto: any) { return this.service.create(dto); }
  @Delete(':id') remove(@Param('id') id: string) { return this.service.remove(+id); }
  
  // DÜZENLEME KAPISI (PUT)
  @Put(':id') update(@Param('id') id: string, @Body() dto: any) { return this.service.update(+id, dto); }
}
