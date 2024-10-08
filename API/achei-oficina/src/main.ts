import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app.module';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config({
    path: '.env.development.local',
  });
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
