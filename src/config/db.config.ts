import { DataSource } from "typeorm";
import { Question } from "../questions/entities/question.entity";
import { Result } from "../results/entities/result.entity";

if (!process.env.DATABASE_URL) {
  console.error("❌ DATABASE_URL is missing");
}

export const AppDataSource = new DataSource({
  type: "postgres",
  url: process.env.DATABASE_URL,
  synchronize: true,
  logging: true,
  entities: [Question, Result],
});
