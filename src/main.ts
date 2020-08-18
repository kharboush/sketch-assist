import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    rateLimit({
      windowMs: 15 * 60 * 1000,
      max: 500,
    }),
  );
  await app.listen(process.env.PORT || 5000);
}
bootstrap();
