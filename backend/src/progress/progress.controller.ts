import { Controller, Get, Post, Body, Param, Query } from '@nestjs/common';
import { ProgressService } from './progress.service';

@Controller('progress')
export class ProgressController {
  constructor(private readonly progressService: ProgressService) {}

  @Get()
  findAll() {
    return this.progressService.findAll();
  }

  // ÜYE ANTRENMANI BİTİRİNCE BURAYA GELECEK
  @Post()
  create(@Body() dto: any) {
    return this.progressService.create(dto);
  }

  @Get('statistics/:userId')
  getStats(@Param('userId') userId: string) {
    return this.progressService.getStatistics(+userId);
  }
}
