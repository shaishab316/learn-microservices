import { NestFactory } from '@nestjs/core';
import { AppModule } from './api-gateway.module';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = app.get(ConfigService);
  await app.listen(parseInt(config.get<string>('PORT')!));
}

bootstrap();
