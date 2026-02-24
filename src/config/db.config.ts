import { DataSource } from 'typeorm';
import { Question } from '../questions/entities/question.entity';
import { Result } from '../results/entities/result.entity';
import 'dotenv/config';
import { Auth } from '../auth/entities/auth.entity';

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  console.error('❌ DATABASE_URL is missing. Please set it in Railway environment variables.');
  process.exit(1); // stop the app if DATABASE_URL is missing
}

export const AppDataSource = new DataSource({
  type: 'postgres',
  url: databaseUrl,
  synchronize: true, // auto-sync tables in dev/prod (disable in production for safety)
  logging: true,
  entities: [Question, Result, Auth],
  subscribers: [],
  migrations: [],
});
