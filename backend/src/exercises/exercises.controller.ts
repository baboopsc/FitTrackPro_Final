import { Controller, Get, Post, Delete, Put, Body, Param } from '@nestjs/common';
import { ExercisesService } from './exercises.service';

@Controller('exercises')
export class ExercisesController {
  constructor(private readonly exercisesService: ExercisesService) {}

  @Get()
  findAll() { return this.exercisesService.findAll(); }

  @Post()
  create(@Body() dto: any) { return this.exercisesService.create(dto); }

  // SİLME
  @Delete(':id')
  remove(@Param('id') id: string) { return this.exercisesService.remove(+id); }

  // DÜZENLEME
  @Put(':id')
  update(@Param('id') id: string, @Body() dto: any) { return this.exercisesService.update(+id, dto); }
}
