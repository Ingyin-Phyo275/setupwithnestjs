import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import dotenv from 'dotenv';

dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors(); // enable CORS if needed
  const port = process.env.PORT || 5000;
  await app.listen(port);
  console.log(`Server is listening at ${port}`);
}
bootstrap();
