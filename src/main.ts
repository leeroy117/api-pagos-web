import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,    // Elimina propiedades no definidas en el DTO
    forbidNonWhitelisted: true, // Lanza un error si hay propiedades no definidas
    // transform: true,    // Transforma los datos al tipo definido en el DTO
  }));
  app.enableCors({
    origin: 'http://localhost:4200',
    methods: 'GET,POST,PUT,DELETE',
    allowedHeaders: 'Content-Type,Authorization',
  });
  
  await app.listen(443);
}
bootstrap();
