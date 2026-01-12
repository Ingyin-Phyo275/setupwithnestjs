import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './config/db.config';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for frontend access
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: '*',
  });

  const port = process.env.PORT || 3000;

  // Start server first (important for Railway health checks)
  await app.listen(port, '0.0.0.0');
  console.log(`🚀 Server running on port ${port}`);

  // Connect to the database
  AppDataSource.initialize()
    .then(() => console.log('✅ Database connected successfully.'))
    .catch((err) => console.error('❌ Database connection failed:', err));
}

bootstrap();
