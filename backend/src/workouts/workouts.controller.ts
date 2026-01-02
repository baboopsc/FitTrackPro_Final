import { Controller, Get, Post, Delete, Put, Body, Param } from '@nestjs/common';
import { WorkoutsService } from './workouts.service';

@Controller('workouts')
export class WorkoutsController {
  constructor(private readonly workoutsService: WorkoutsService) {}

  @Get() findAll() { return this.workoutsService.findAll(); }
  @Get('statistics') getStats() { return this.workoutsService.getStatistics(); }
  @Post() create(@Body() d: any) { return this.workoutsService.create(d); }
  @Get(':id') findOne(@Param('id') id: string) { return this.workoutsService.findOne(+id); }
  @Delete(':id') remove(@Param('id') id: string) { return this.workoutsService.remove(+id); }
  @Post('review') addReview(@Body() d: any) { return this.workoutsService.addReview(d); }

  // PROGRAM DÜZENLEME
  @Put(':id') update(@Param('id') id: string, @Body() d: any) { return this.workoutsService.update(+id, d); }
}
