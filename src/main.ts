import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import dotenv from 'dotenv';
import { AppDataSource } from './config/db.config';

dotenv.config();

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  AppDataSource.initialize()
  .then(() => {
    console.log('✅ Database connected successfully.');

    app.listen(process.env.PORT || 3000, "0.0.0.0", () => {
      console.log(`🚀 Server is running on http://localhost:${process.env.PORT}`);
    });

      app.enableCors({
    origin: '*', // allows all origins
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
    allowedHeaders: '*', // allows all headers
  });

  })
  .catch((error) => {
    console.error('❌ Failed to connect to the database:', error);
    process.exit(1); // stop app if DB connection fails
  });
}
bootstrap();
