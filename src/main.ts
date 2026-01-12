import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { AppDataSource } from './config/db.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: '*',
  });

  const port = Number(process.env.PORT) || 3000;

  await app.listen(port, '0.0.0.0');
  console.log(`🚀 Server running on port ${port}`);

  AppDataSource.initialize()
    .then(() => {
      console.log('✅ Database connected successfully.');
    })
    .catch((error) => {
      console.error('❌ Database connection failed:', error);
    });
}

bootstrap();
