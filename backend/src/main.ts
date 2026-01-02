import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // CORS ayarını açıyoruz ki Frontend rahatça ulaşsın
  app.enableCors();
  
  // Render'ın verdiği portu kullan, yoksa 3000'i kullan
  await app.listen(process.env.PORT || 3000);
}
bootstrap();
