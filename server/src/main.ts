import { NestFactory } from '@nestjs/core';
import * as fs from 'fs';
import { config } from 'dotenv';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

// load env variables for given environment
const envFile = process.env.NODE_ENV
  ? `.env.${process.env.NODE_ENV}` // load .env or .env.prod
  : '.env'; // default to .env

if (fs.existsSync(envFile)) {
  config({ path: envFile });
} else {
  config(); // Fallback to default .env if specific file isn't found
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // enable global validation pipe here
  app.useGlobalPipes(new ValidationPipe());

  // TODO: remove Swagger configuration; since we don't use it in our GQL APIs
  const config = new DocumentBuilder()
    .setTitle('DigiNotarer API')
    .setDescription(
      'The API for "DijitallNotarer" - the Digital Notarization Platform!!',
    )
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const SERVER_PORT = process.env.SERVER_PORT || 8082;
  await app.listen(SERVER_PORT);
}

bootstrap();
