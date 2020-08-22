import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as rateLimit from 'express-rate-limit';
import * as helmet from 'helmet';
import { AppModule } from './app.module';
import info from './statics/info';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  const options = new DocumentBuilder()
    .setTitle(info.title)
    .setVersion(info.ver)
    .setDescription(info.desc)
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  app.enableCors();
  app.use(helmet());
  app.useGlobalPipes(new ValidationPipe());
  app.use(
    rateLimit({
      windowMs: 5 * 60 * 1000,
      max: 100,
    }),
  );

  await app.listen(process.env.PORT || 5000);
}

bootstrap();
