import 'reflect-metadata';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import cluster from 'cluster';
import os from 'os';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
    app.enableCors({
    origin: 'https://hotel-management-six-wheat.vercel.app',
    credentials: true,
  });
await app.listen(3000);

}

if (process.env.CLUSTER === 'true' && cluster.isPrimary) {
  const cpuCount = os.cpus().length;

  for (let i = 0; i < cpuCount; i++) {
    cluster.fork();
  }

  cluster.on('exit', () => {
    cluster.fork();
  });
} else {
  bootstrap();
}
