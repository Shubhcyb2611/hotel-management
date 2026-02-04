import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Global API prefix
  app.setGlobalPrefix('api');

  // Swagger Configuration
  const config = new DocumentBuilder()
    .setTitle('Hotel Room Reservation API')
    .setDescription('APIs for managing hotel rooms and bookings')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);


  // CORS
  app.enableCors({
    origin: 'https://hotel-management-six-wheat.vercel.app',
    credentials: true,
  });

  const PORT = process.env.PORT || 3000;
  await app.listen(PORT);
  console.log('Swagger docs available at: http://localhost:3000/api/docs');
  console.log(`Server running on port ${PORT}`);
}

bootstrap();
