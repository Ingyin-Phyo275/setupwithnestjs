import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import dotenv from 'dotenv';
import { AppDataSource } from './config/db.config';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // ✅ Enable CORS BEFORE listen
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: '*',
  });

  const port = process.env.PORT || 3000;

  // ✅ Start server FIRST (important for health checks)
  await app.listen(port, '0.0.0.0');
  console.log(`🚀 Server running on port ${port}`);

  // ✅ Connect DB AFTER server is up
  AppDataSource.initialize()
    .then(() => {
      console.log('✅ Database connected successfully.');
    })
    .catch((error) => {
      // ❗ DO NOT exit the process in production
      console.error('❌ Database connection failed:', error);
    });
}

bootstrap();
