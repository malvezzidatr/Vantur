import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('Vantur API')
    .setDescription('Vantur API')
    .setVersion('0.4')
    .addTag('Auth')
    .addTag('User')
    .addTag('Travel')
    .addBearerAuth(
      {
        type: 'http',
        in: 'Header',
        name: 'authorization',
        scheme: 'Bearer',
        bearerFormat: 'Bearer',
      },
      'authorization',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  await app.listen(3000);
}
bootstrap();
